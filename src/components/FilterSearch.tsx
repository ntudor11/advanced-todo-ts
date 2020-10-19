import React from "react";
import InputRange from "react-input-range";
import { Row, Col, Form } from "react-bootstrap";

const FilterSearch = (props: any) => {
  const {
    filterStr,
    setFilterStr,
    isActive,
    onChange,
    getMax,
    getMin,
    getDeadlines,
    range,
    setRange,
    sortBy,
  } = props;

  return (
    <Row>
      <Col>
        <h3>Search</h3>

        <Form.Control
          style={{ width: "100%" }}
          type="text"
          className="search-input-left"
          value={filterStr}
          placeholder="Search here"
          onChange={setFilterStr}
        />

        <h3>Filter</h3>

        <div
          className="pretty p-default p-curve"
          style={{ marginBottom: "2em" }}
        >
          <input
            type="checkbox"
            name="isActive"
            value={isActive}
            onChange={onChange}
            checked={isActive}
          />
          <div className="state p-info">
            <label>Active</label>
          </div>
        </div>

        <div>
          <label>By Date</label>
          <InputRange
            maxValue={new Date(getMax(getDeadlines())).getTime()}
            minValue={new Date(getMin(getDeadlines())).getTime()}
            formatLabel={(value) =>
              new Date(value).toLocaleString().substring(0, 10)
            }
            allowSameValues={true}
            value={range}
            onChange={setRange}
          />
        </div>

        <h3>Sort By</h3>

        <div>
          <Form.Control
            as="select"
            name="sortBy"
            value={sortBy}
            onChange={onChange}
          >
            <option value="" disabled>
              Choose Type
            </option>
            <option value="priority">Priority</option>
            <option value="date">Date</option>
            <option value="task">Task</option>
          </Form.Control>
        </div>
      </Col>
    </Row>
  );
};

export default FilterSearch;
