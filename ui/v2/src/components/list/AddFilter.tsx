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
  FormGroup,
} from "@blueprintjs/core";
import {
  ListFilterModel,
  CriterionOption,
  Criterion,
  CriterionType,
  DisplayMode,
  CriterionValueType
} from '../../models/list-filter';

type AddFilterProps = {
  onAddCriterion: (criterion: Criterion) => void
  filter: ListFilterModel
}
type AddFilterState = {}

export class AddFilter extends React.Component<AddFilterProps, AddFilterState> {
  private criterionType: CriterionType = CriterionType.None;
  private criterion: Criterion = new Criterion();

  private async onChangedCriteriaType(event: React.ChangeEvent<HTMLSelectElement>) {
    this.criterionType = parseInt(event.target.value);
    await this.criterion.configure(this.criterionType);
    this.forceUpdate();
  }

  private async onChangedSingleCriteriaValue(event: React.ChangeEvent<HTMLSelectElement>) {
    this.criterion.value = event.target.value
  }

  private onAddFilter() {
    this.props.onAddCriterion(this.criterion);
    this.criterionType = CriterionType.None;
    this.criterion = new Criterion();
    this.forceUpdate();
  }

  render() {
    return (
      <Popover position="bottom" className="filter-item">
        <Button large={true}>Filter</Button>
        <div className={Classes.POPOVER_DISMISS}>
          <FormGroup label="Filter">
            <HTMLSelect
              style={{flexBasis: 'min-content'}}
              options={this.props.filter.criterionOptions}
              onChange={this.onChangedCriteriaType.bind(this)}
              className={Classes.POPOVER_DISMISS_OVERRIDE} />
          </FormGroup>
          {this.criterionType !== CriterionType.None ? (
            <>
              <FormGroup>
                <HTMLSelect
                  options={this.criterion.options}
                  onChange={this.onChangedSingleCriteriaValue.bind(this)}
                  className={Classes.POPOVER_DISMISS_OVERRIDE} />
              </FormGroup>
              <div>
                <Button onClick={this.onAddFilter.bind(this)}>Add Filter</Button>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </Popover>
    )
  }
}