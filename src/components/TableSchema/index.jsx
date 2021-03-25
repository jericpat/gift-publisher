import React, { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import types from "../../db/types.json";
import osTypes from "../../db/os-types.json";
import osTypesDesc from "../../db/os-type-descriptions.json";
import "./TableSchema.css";

const osTypesPath =
  "https://raw.githubusercontent.com/datopian/gift-os-types/main/os-types.json";
const osTypesDescPath =
  "https://raw.githubusercontent.com/datopian/gift-os-types/main/os-type-descriptions.json";

const TableSchema = (props) => {
  const [userOSTypes, setUserOSTypes] = useState(osTypes); //set default value to local types in case of fetch issue
  const [userOSTypesDesc, setUserOSTypesDesc] = useState(osTypesDesc);
  const [schema, setSchema] = useState(props.schema);
  const [unfilledRichTypes, setUnfilledRichTypes] = useState(
    props.schema.fields.length
  );

  useEffect(() => {
    async function fetchTypes() {
      let uTypes = await (await fetch(osTypesPath)).json();
      let uTypeDesc = await (await fetch(osTypesDescPath)).json();
      setUserOSTypes(uTypes);
      setUserOSTypesDesc(uTypeDesc);
    }
    fetchTypes();
  }, []);

  useEffect(() => {
    if (
      props.dataset.resources &&
      props.dataset.resources.length > 1 &&
      resourceHasRichType(props.dataset)
    ) {
      props.handleRichType(0);
    }
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = React.useMemo(() => [...props.data], [schema]);

  const columnsSchema = schema.fields.map((item, index) => {
    return {
      Header: item.name ? item.name : `column_${index + 1}`,
      accessor: item.name ? item.name : `column_${index + 1}`,
    };
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = React.useMemo(() => [...columnsSchema], [schema]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const handleChange = (event, key, index) => {
    const newSchema = { ...schema };
    if (key == "columnType") {
      setUnfilledRichTypes(unfilledRichTypes - 1);
      props.handleRichType(unfilledRichTypes - 1);
      newSchema.fields[index][key] = event.value;
      setSchema(newSchema);
    } else {
      newSchema.fields[index][key] = event.target.value;
      setSchema(newSchema);
    }
  };

  const resourceHasRichType = (dataset) => {
    if (
      Object.keys(dataset).includes("resources") &&
      dataset.resources.length > 0
    ) {
      const fields = dataset.resources[0].schema.fields;
      const columnTypes = fields.filter((field) => {
        return Object.keys(field).includes("columnType");
      });

      const hasRichTypes = columnTypes.length == fields.length ? true : false;
      return hasRichTypes;
    }
  };

  //if the the user upload a new file, will update the state
  //and render with the new values
  useEffect(() => {
    setSchema(props.schema);
  }, [props.schema]);

  //set column types search input box
  let ctypeKeys = Object.keys(userOSTypes);
  const columnTypeOptions = ctypeKeys.map((key) => {
    let desc;
    let label;
    let value = key;
    if (userOSTypesDesc[key]) {
      desc = userOSTypesDesc[key]["description"];
      label = value + " " + "➜" + " " + desc;
    } else {
      desc = "";
      label = value;
    }

    return { label, value };
  });

  const renderEditSchemaField = (key) => {
    if (key === "type") {
      return schema.fields.map((item, index) => (
        <td key={`schema-type-field-${key}-${index}`}>
          <select
            className="table-tbody-select"
            value={item[key] || ""}
            onChange={(event) => handleChange(event, key, index)}
          >
            {types.type.map((item, index) => {
              return (
                <option
                  key={`schema-type-field-option-${item}-${index}`}
                  value={item}
                >
                  {item}
                </option>
              );
            })}
          </select>
        </td>
      ));
    }
    //style for column rich type select field
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        borderBottom: "1px dotted pink",
        color: state.selectProps.menuColor,
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        return { ...provided, opacity, transition };
      },
    };

    if (key === "columnType") {
      if (
        props.dataset.resources &&
        props.dataset.resources.length > 1 &&
        resourceHasRichType(props.dataset)
      ) {
        const existingRichTypes = props.dataset.resources[0].schema.fields.map(
          (field) => {
            return field.columnType;
          }
        );
        //The schema already exists, and we assume columns have the same richTypes. Prefill and set to uneditable
        return existingRichTypes.map((item, index) => (
          <td key={`schema-type-field-${key}-${index}`}>
            <input
              className="table-tbody-input"
              type="text"
              value={item}
              disabled
            />
          </td>
        ));
      } else {
        return schema.fields.map((item, index) => (
          <td key={`schema-type-field-${key}-${index}`}>
            <Select
              styles={customStyles}
              options={columnTypeOptions}
              width="200px"
              menuColor="red"
              onChange={(event) => handleChange(event, key, index)}
            />
          </td>
        ));
      }
    }

    return schema.fields.map((item, index) => (
      <td key={`schema-field-${key}-${index}`}>
        <input
          className="table-tbody-input"
          type="text"
          value={item[key]}
          onChange={(event) => handleChange(event, key, index)}
        />
      </td>
    ));
  };

  return (
    <>
      <div className="table-container">
        <table className="table-schema-help">
          <tbody>
            <tr className="table-tbody-help-tr">
              <td className="table-tbody-help-td-empty"></td>
            </tr>
            <tr className="table-tbody-help-tr">
              <td className="table-tbody-help-td">Title</td>
            </tr>
            <tr className="table-tbody-help-tr">
              <td className="table-tbody-help-td">Description</td>
            </tr>
            <tr className="table-tbody-help-tr">
              <td className="table-tbody-help-td">Type</td>
            </tr>
            <tr className="table-tbody-help-tr">
              <td className="table-tbody-help-td">Format</td>
            </tr>
            <tr className="table-tbody-help-tr">
              <td className="table-tbody-help-td">Rich Type</td>
            </tr>
          </tbody>
        </table>
        <div className="table-schema-info_container">
          <table className="table-schema-info_table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className="table-thead-tr"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th className="table-thead-th" {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              <tr className="table-tbody-tr-help">
                {renderEditSchemaField("title")}
              </tr>
              <tr className="table-tbody-tr-help">
                {renderEditSchemaField("description")}
              </tr>
              <tr>{renderEditSchemaField("type")}</tr>
              <tr>{renderEditSchemaField("format")}</tr>
              <tr>{renderEditSchemaField("columnType")}</tr>
              <br />
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className="table-tbody-td">
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

TableSchema.propTypes = {
  schema: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  handleRichType: PropTypes.func.isRequired,
};

export default TableSchema;
