import React from "react";
import PropTypes from "prop-types";


const ResourceList = ({ dataset, deleteResource, addResourceScreen }) => {
  const hasResources = Object.keys(dataset).includes("resources")
  if (!hasResources) {
    return (
      <div>
        <div>
          <h1>No Resource Available</h1>
        </div>
        <div className="resource-edit-actions">
          <button className="btn" onClick={() => { addResourceScreen() }}>
            Add Resource
          </button>
        </div>
      </div>
    )
  }
  const resources = [...dataset.resources]

  return (
    <div>
      <div className="justify-center">
        <div>
          <h1>
            Available resources in the dataset
          </h1>
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {resources.map((resource, i) => {
                return (
                  <tr key={`${i}-index`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {resource.title || resource.name}
                          </div>

                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <button id={`rmBtn${i}`}
                            type="button"
                            className="btn-delete"
                            onClick={() => { deleteResource(resource.hash) }}>Remove</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="resource-edit-actions">
            <button className="btn" onClick={() => { addResourceScreen() }}>
              Add Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ResourceList.propTypes = {
  dataset: PropTypes.object.isRequired,
  deleteResource: PropTypes.func.isRequired,
  addResourceScreen: PropTypes.func.isRequired
};

export default ResourceList;
