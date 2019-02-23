import React from 'react';
import { Maybe } from '../../models';
import { ButtonGroup, Button } from '@blueprintjs/core';

interface PaginationProps {
  itemsPerPage: number
  currentPage: number
  totalItems: number
  onChangePage: (page: number) => void
}

interface PaginationState {
  totalPages: number,
  pages: number[]
}

export class Pagination extends React.Component<PaginationProps, PaginationState> {
  constructor(props: PaginationProps) {
    super(props);
    this.state = {
      totalPages: Number.MAX_SAFE_INTEGER,
      pages: []
    };
  }

  componentWillMount() {
    this.setPage(this.props.currentPage, false);
  }

  componentDidUpdate(prevProps: PaginationProps) {
    // console.log(this.props)
    if (this.props.totalItems !== prevProps.totalItems || this.props.itemsPerPage !== prevProps.itemsPerPage) this.setPage(this.props.currentPage);
  }

  private setPage(page: Maybe<number>, propagate: boolean = true) {
    if (page === undefined) return;

    const pagerState = this.getPagerState(this.props.totalItems, page, this.props.itemsPerPage);

    if (page < 1) page = 1;
    if (page > pagerState.totalPages) page = pagerState.totalPages;

    this.setState(pagerState);
    if (propagate) this.props.onChangePage(page);
  }

  private getPagerState(totalItems: number, currentPage: number, pageSize: number) {
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // create an array of pages numbers
    var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    return {
      totalPages: totalPages,
      pages: pages
    };
  }

  render() {
    if (!this.state || !this.state.pages || this.state.pages.length <= 1) { return null; }

    return (
      <ButtonGroup large={true} className="filter-container">
        <Button
          text="First"
          disabled={this.props.currentPage === 1}
          onClick={() => this.setPage(1)} />
        <Button
          text="Previous"
          disabled={this.props.currentPage === 1}
          onClick={() => this.setPage(this.props.currentPage - 1)} />
        {this.state.pages.map((page: number, index: number) =>
          <Button
            key={index}
            text={page}
            active={this.props.currentPage === page}
            onClick={() => this.setPage(page)} />
        )}
        <Button
          text="Next"
          disabled={this.props.currentPage === this.state.totalPages}
          onClick={() => this.setPage(this.props.currentPage + 1)} />
        <Button
          text="Last"
          disabled={this.props.currentPage === this.state.totalPages}
          onClick={() => this.setPage(this.state.totalPages)} />
      </ButtonGroup>
    );
  }
}
