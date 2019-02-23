import React, { SyntheticEvent } from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  ControlGroup,
  HTMLSelect,
  InputGroup,
  ButtonGroup,
  AnchorButton,
  Popover,
  Menu,
  MenuItem,
  Divider,
} from "@blueprintjs/core";
import { ListFilter as Filter, CriteriaOption, Criteria, CriteriaType, DisplayMode, CriteriaValueType } from '../../models/list';

type AddFilterProps = {
  onAddCriteria: (criteria: Criteria) => void
  filter: Filter
}
type AddFilterState = {}

export class AddFilter extends React.PureComponent<AddFilterProps, AddFilterState> {
  private criteriaType: CriteriaType = CriteriaType.None;
  private criteria: Criteria = new Criteria();

  private async onChangedCriteriaType(event: React.ChangeEvent<HTMLSelectElement>) {
    this.criteriaType = parseInt(event.target.value);
    await this.criteria.configure(this.criteriaType);
    this.forceUpdate();
  }

  private async onChangedSingleCriteriaValue(event: React.ChangeEvent<HTMLSelectElement>) {
    this.criteria.value = event.target.value
  }

  private onAddFilter() {
    this.props.onAddCriteria(this.criteria);
    this.criteriaType = CriteriaType.None;
    this.criteria = new Criteria();
    this.forceUpdate();
  }

  render() {
    return (
      <Popover position="bottom" className="filter-item">
        <Button large={true}>Filter</Button>
        <div>
          <div>
            <HTMLSelect
              style={{flexBasis: 'min-content'}}
              options={this.props.filter.criteriaOptions.map(option => (
                {label: option.name, value: option.value}
              ))}
              onChange={this.onChangedCriteriaType.bind(this)} />
          </div>
          <div>
            {this.criteriaType !== CriteriaType.None ? (
              <HTMLSelect
                options={this.criteria.options}
                onChange={this.onChangedSingleCriteriaValue.bind(this)} />
            ) : (
              ""
            )}
          </div>
          <div>
          <Button onClick={this.onAddFilter.bind(this)}>Add Filter</Button>
          </div>
        </div>
      </Popover>
    )
  }
}