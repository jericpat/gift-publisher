import React from "react";
import { shallow } from "enzyme";

import CustomTable from "./index";

describe("<CustomTable />", () => {
  it("render CustomTable without crashing", () => {
    // const onSchemaSelected = jest.fn();
    const resources = [{ name: "sample.csv", id: "sample-id" }];
    const data = [
      {
        name: "Tanner Linsley",
        age: 26,
      },
      {
        name: "Tanner Adams",
        age: 23,
      },
    ];
    const columns = [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
    ];

    const wrapper = shallow(<CustomTable data={data} columns={columns} />);

    expect(wrapper.contains("Tanner Linsley"))
    expect(wrapper.find("Table"))
    expect(wrapper.find("TableRow"))

  });

});
