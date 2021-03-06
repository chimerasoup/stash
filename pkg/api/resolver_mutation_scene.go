package api

import (
	"context"
	"database/sql"
	"github.com/stashapp/stash/pkg/database"
	"github.com/stashapp/stash/pkg/models"
	"strconv"
	"time"
)

func (r *mutationResolver) SceneUpdate(ctx context.Context, input models.SceneUpdateInput) (*models.Scene, error) {
	// Populate scene from the input
	sceneID, _ := strconv.Atoi(input.ID)
	updatedTime := time.Now()
	updatedScene := models.Scene{
		ID:        sceneID,
		UpdatedAt: models.SQLiteTimestamp{Timestamp: updatedTime},
	}
	if input.Title != nil {
		updatedScene.Title = sql.NullString{String: *input.Title, Valid: true}
	}
	if input.Details != nil {
		updatedScene.Details = sql.NullString{String: *input.Details, Valid: true}
	}
	if input.URL != nil {
		updatedScene.URL = sql.NullString{String: *input.URL, Valid: true}
	}
	if input.Date != nil {
		updatedScene.Date = sql.NullString{String: *input.Date, Valid: true}
	}
	if input.Rating != nil {
		updatedScene.Rating = sql.NullInt64{Int64: int64(*input.Rating), Valid: true}
	}
	if input.StudioID != nil {
		studioID, _ := strconv.ParseInt(*input.StudioID, 10, 64)
		updatedScene.StudioID = sql.NullInt64{Int64: studioID, Valid: true}
	}

	// Start the transaction and save the scene marker
	tx := database.DB.MustBeginTx(ctx, nil)
	qb := models.NewSceneQueryBuilder()
	jqb := models.NewJoinsQueryBuilder()
	scene, err := qb.Update(updatedScene, tx)
	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	if input.GalleryID != nil {
		// Save the gallery
		galleryID, _ := strconv.Atoi(*input.GalleryID)
		updatedGallery := models.Gallery{
			ID:        galleryID,
			SceneID:   sql.NullInt64{Int64: int64(sceneID), Valid: true},
			UpdatedAt: models.SQLiteTimestamp{Timestamp: updatedTime},
		}
		gqb := models.NewGalleryQueryBuilder()
		_, err := gqb.Update(updatedGallery, tx)
		if err != nil {
			_ = tx.Rollback()
			return nil, err
		}
	}

	// Save the performers
	var performerJoins []models.PerformersScenes
	for _, pid := range input.PerformerIds {
		performerID, _ := strconv.Atoi(pid)
		performerJoin := models.PerformersScenes{
			PerformerID: performerID,
			SceneID:     sceneID,
		}
		performerJoins = append(performerJoins, performerJoin)
	}
	if err := jqb.UpdatePerformersScenes(sceneID, performerJoins, tx); err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	// Save the tags
	var tagJoins []models.ScenesTags
	for _, tid := range input.TagIds {
		tagID, _ := strconv.Atoi(tid)
		tagJoin := models.ScenesTags{
			SceneID: sceneID,
			TagID:   tagID,
		}
		tagJoins = append(tagJoins, tagJoin)
	}
	if err := jqb.UpdateScenesTags(sceneID, tagJoins, tx); err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	// Commit
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return scene, nil
}

func (r *mutationResolver) SceneMarkerCreate(ctx context.Context, input models.SceneMarkerCreateInput) (*models.SceneMarker, error) {
	primaryTagID, _ := strconv.Atoi(input.PrimaryTagID)
	sceneID, _ := strconv.Atoi(input.SceneID)
	currentTime := time.Now()
	newSceneMarker := models.SceneMarker{
		Title:        input.Title,
		Seconds:      input.Seconds,
		PrimaryTagID: sql.NullInt64{Int64: int64(primaryTagID), Valid: primaryTagID != 0},
		SceneID:      sql.NullInt64{Int64: int64(sceneID), Valid: sceneID != 0},
		CreatedAt:    models.SQLiteTimestamp{Timestamp: currentTime},
		UpdatedAt:    models.SQLiteTimestamp{Timestamp: currentTime},
	}

	// Start the transaction and save the scene marker
	tx := database.DB.MustBeginTx(ctx, nil)
	smqb := models.NewSceneMarkerQueryBuilder()
	jqb := models.NewJoinsQueryBuilder()
	sceneMarker, err := smqb.Create(newSceneMarker, tx)
	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	// Save the marker tags
	var markerTagJoins []models.SceneMarkersTags
	for _, tid := range input.TagIds {
		tagID, _ := strconv.Atoi(tid)
		markerTag := models.SceneMarkersTags{
			SceneMarkerID: sceneMarker.ID,
			TagID:         tagID,
		}
		markerTagJoins = append(markerTagJoins, markerTag)
	}
	if err := jqb.CreateSceneMarkersTags(markerTagJoins, tx); err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	// Commit
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return sceneMarker, nil
}

func (r *mutationResolver) SceneMarkerUpdate(ctx context.Context, input models.SceneMarkerUpdateInput) (*models.SceneMarker, error) {
	// Populate scene marker from the input
	sceneMarkerID, _ := strconv.Atoi(input.ID)
	sceneID, _ := strconv.Atoi(input.SceneID)
	primaryTagID, _ := strconv.Atoi(input.PrimaryTagID)
	updatedSceneMarker := models.SceneMarker{
		ID:           sceneMarkerID,
		Title:        input.Title,
		Seconds:      input.Seconds,
		SceneID:      sql.NullInt64{Int64: int64(sceneID), Valid: sceneID != 0},
		PrimaryTagID: sql.NullInt64{Int64: int64(primaryTagID), Valid: primaryTagID != 0},
		UpdatedAt:    models.SQLiteTimestamp{Timestamp: time.Now()},
	}

	// Start the transaction and save the scene marker
	tx := database.DB.MustBeginTx(ctx, nil)
	qb := models.NewSceneMarkerQueryBuilder()
	jqb := models.NewJoinsQueryBuilder()
	sceneMarker, err := qb.Update(updatedSceneMarker, tx)
	if err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	// Save the marker tags
	var markerTagJoins []models.SceneMarkersTags
	for _, tid := range input.TagIds {
		tagID, _ := strconv.Atoi(tid)
		markerTag := models.SceneMarkersTags{
			SceneMarkerID: sceneMarkerID,
			TagID:         tagID,
		}
		markerTagJoins = append(markerTagJoins, markerTag)
	}
	if err := jqb.UpdateSceneMarkersTags(sceneMarkerID, markerTagJoins, tx); err != nil {
		_ = tx.Rollback()
		return nil, err
	}

	// Commit
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return sceneMarker, nil
}

func (r *mutationResolver) SceneMarkerDestroy(ctx context.Context, id string) (bool, error) {
	qb := models.NewSceneMarkerQueryBuilder()
	tx := database.DB.MustBeginTx(ctx, nil)
	if err := qb.Destroy(id, tx); err != nil {
		_ = tx.Rollback()
		return false, err
	}
	if err := tx.Commit(); err != nil {
		return false, err
	}
	return true, nil
}
