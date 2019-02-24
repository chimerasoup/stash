import {
  Button,
  Classes,
  FormGroup,
  HTMLSelect,
  Popover,
} from "@blueprintjs/core";
import React from "react";
import {
  Criterion,
  CriterionType,
  ListFilterModel,
} from "../../models/list-filter";

interface IAddFilterProps {
  onAddCriterion: (criterion: Criterion) => void;
  filter: ListFilterModel;
}
interface IAddFilterState {}

export class AddFilter extends React.Component<IAddFilterProps, IAddFilterState> {
  private criterionType: CriterionType = CriterionType.None;
  private criterion: Criterion = new Criterion();

  constructor(props: IAddFilterProps) {
    super(props);
    this.onChangedCriteriaType = this.onChangedCriteriaType.bind(this);
    this.onChangedSingleCriteriaValue = this.onChangedSingleCriteriaValue.bind(this);
    this.onAddFilter = this.onAddFilter.bind(this);
  }

  public render() {
    return (
      <Popover position="bottom" className="filter-item">
        <Button large={true}>Filter</Button>
        <div className={Classes.POPOVER_DISMISS}>
          <FormGroup label="Filter">
            <HTMLSelect
              style={{flexBasis: "min-content"}}
              options={this.props.filter.criterionOptions}
              onChange={this.onChangedCriteriaType}
              className={Classes.POPOVER_DISMISS_OVERRIDE}
            />
          </FormGroup>
          {this.maybeRenderFilterPopoverContents()}
        </div>
      </Popover>
    );
  }

  private maybeRenderFilterPopoverContents() {
    if (this.criterionType === CriterionType.None) { return; }
    return (
      <>
        <FormGroup>
          <HTMLSelect
            options={this.criterion.options}
            onChange={this.onChangedSingleCriteriaValue}
            className={Classes.POPOVER_DISMISS_OVERRIDE}
          />
        </FormGroup>
        <div>
          <Button onClick={this.onAddFilter}>Add Filter</Button>
        </div>
      </>
    );
  }

  private async onChangedCriteriaType(event: React.ChangeEvent<HTMLSelectElement>) {
    this.criterionType = parseInt(event.target.value, 10);
    await this.criterion.configure(this.criterionType);
    this.forceUpdate();
  }

  private async onChangedSingleCriteriaValue(event: React.ChangeEvent<HTMLSelectElement>) {
    this.criterion.value = event.target.value;
  }

  private onAddFilter() {
    this.props.onAddCriterion(this.criterion);
    this.criterionType = CriterionType.None;
    this.criterion = new Criterion();
    this.forceUpdate();
  }
}
