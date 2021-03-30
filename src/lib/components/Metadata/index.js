import React from "react";
import PropTypes from "prop-types";
import { encodeData } from "datapub-nocss";
import countries from "../../db/countries.json"

const Metadata = ({ dataset, handleChange }) => {
  const isCheck = (val, field) => {
    return dataset[field] && dataset[field].includes(val);
  };

  return (
    <>
      <h3 className='metadata-section-title'>
        Mandatory fields are marked with an asterisk (
        <span className='ast-important'>*</span>).
      </h3>
      <h1 className='metadata-section-title'>
        <b>General</b>
      </h1>
      <div className='metadata-input'>
        <input
          className='metadata-input__input'
          type='text'
          name='title'
          id='title'
          placeholder='example_file.csv'
          value={dataset.title}
          required
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <label className='metadata-label' htmlFor='title'>
          <span className='ast-important'>*</span> Title of the dataset
        </label>
      </div>

      <div className='metadata-input'>
        <textarea
          className='metadata-input__textarea'
          type='text'
          name='description'
          id='description'
          placeholder='Enter a description for your dataset'
          value={dataset.description || ''}
          onChange={(e) => {
            handleChange(e);
          }}
          rows={5}
          required
        ></textarea>
        <label className='metadata-label' htmlFor='description'>
          <span className='ast-important'>*</span> Description of the dataset
        </label>
      </div>
      <div className="metadata-input">
        <input
          className="metadata-input__input"
          type="url"
          name="image"
          id="image"
          placeholder="https://mylogo.png"
          value={dataset.image}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <label className="metadata-label" htmlFor="title">
          Logo Url
        </label>
      </div>
      <div className="metadata-input">
        <textarea
          className='metadata-input__textarea'
          type='text'
          name='tags'
          id='tags'
          required
          placeholder='Finance, Budget'
          value={dataset.tags || ''}
          onChange={(e) => {
            handleChange(e);
          }}
          rows={2}
        ></textarea>
        <div className="tooltip">
          <span className="tooltiptext">
            Only letters are allowed: tags are single words separated by a comma
          </span>
          <label className="metadata-label" htmlFor="tags">
            <span className="ast-important">*</span>
            Tags
          </label>
        </div>
      </div>

      <div className='metadata-form-grp3'>
        <div className='metadata-input'>
          <select
            className='metadata-input__input'
            name='govt_level'
            id='govt_level'
            value={dataset.govt_level || ''}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          >
            <option value="">Select</option>
            <option value="Municipal">Municipal</option>
            <option value="National">National</option>
            <option value="Provincial">Provincial</option>
            <option value="Regional">Regional</option>
            <option value="State-level">State-level</option>
          </select>
          <label className="metadata-label" htmlFor="govt_level">
            <span className="ast-important">*</span> Level of government
          </label>
        </div>
        <div>
          <div className="metadata-input__input">
            <input
              type="checkbox"
              checked={isCheck("State own enterprises", "disaggregation")}
              id="dgg_state"
              name="disaggregation"
              value="State own enterprises"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor='dgg_state'> State own enterprises</label>
          </div>
          <div className='metadata-input__input'>
            <input
              type='checkbox'
              checked={isCheck('Public investments', 'disaggregation')}
              id='dgg_pub_inv'
              name='disaggregation'
              value='Public investments'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor='dgg_pub_inv'> Public investments</label>
          </div>
          <div className='metadata-input__input'>
            <input
              type='checkbox'
              checked={isCheck('Public programs', 'disaggregation')}
              id='dgg_pub_prog'
              name='disaggregation'
              value='Public programs'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor='dgg_pub_prog'> Public programs</label>
          </div>
          <div className='metadata-input__input'>
            <input
              type='checkbox'
              checked={isCheck('Line item', 'disaggregation')}
              id='dgg_line'
              name='disaggregation'
              value='Line item'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor='dgg_line'> Line item</label>
          </div>
          <label className='metadata-label-checkbox'>Disaggregation</label>
        </div>

        <div>
          <div className='metadata-input__input'>
            <input
              type='checkbox'
              checked={isCheck('Quarterly reports', 'budget_stage')}
              id='budget_qt'
              name='budget_stage'
              value='Quarterly reports'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor='budget_qt'> Quarterly reports</label>
          </div>
          <div className='metadata-input__input'>
            <input
              type='checkbox'
              checked={isCheck('Year-end', 'budget_stage')}
              id='budget_yr'
              name='budget_stage'
              value='Year-end'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor='budget_yr'> Year-end</label>
          </div>
          <div className='metadata-input__input'>
            <input
              type='checkbox'
              checked={isCheck('Proposed', 'budget_stage')}
              id='budget_prop'
              name='budget_stage'
              value='Proposed'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor='budget_prop'> Proposed</label>
          </div>
          <div className='metadata-input__input'>
            <input
              type='checkbox'
              checked={isCheck('Enacted', 'budget_stage')}
              id='budget_st'
              name='budget_stage'
              value='Enacted'
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <label htmlFor='budget_st'> Enacted</label>
          </div>
          <label className='metadata-label-checkbox'>Budget Stage</label>
        </div>
      </div>

      <h1 className='metadata-section-title'>
        <b>Owner</b>
      </h1>
      <div className='metadata-form'>
        <div className='metadata-input'>
          <input
            className='metadata-input__input'
            type='url'
            name='author_website'
            id='author_website'
            value={dataset.author_website}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className='metadata-label' htmlFor='author_website'>
            Author's website
          </label>
        </div>
        <div className='metadata-input'>
          <input
            className='metadata-input__input'
            type='email'
            name='author_email'
            id='author_email'
            value={dataset.author_email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className='metadata-label' htmlFor='author_email'>
            Author's email address
          </label>
        </div>
      </div>
      <div className='metadata-input'>
        <input
          className='metadata-input__input'
          type='text'
          name='pub_institutional_name'
          id='pub_institutional_name'
          value={dataset.pub_institutional_name}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <label className='metadata-label' htmlFor='pub_institutional_name'>
          <span className='ast-important'>*</span> Publisher's institutional
          name
        </label>
      </div>
      <br />

      <h1 className='metadata-section-title'>
        <b>Location</b>
      </h1>

      <div className='metadata-form'>
        <div className='metadata-input'>
          <select
            className='metadata-input__input'
            name='continent'
            id='continent'
            value={dataset.continent || ''}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          >
            <option value=''>Select</option>
            <option value='Europe'>Europe</option>
            <option value='Africa'>Africa</option>
            <option value='Asia'>Asia</option>
            <option value='North America'>North America</option>
            <option value='South America'>South America</option>
            <option value='Australia'>Australia</option>
          </select>
          <label className='metadata-label' htmlFor='continent'>
            <span className='ast-important'>*</span> Continent
          </label>
        </div>
        <div className='metadata-input'>
          <input
            className='metadata-input__input'
            type='text'
            name='region'
            id='region'
            value={dataset.region}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className='metadata-label' htmlFor='region'>
            Region
          </label>
        </div>
      </div>

      <div className='metadata-form'>
        <div className='metadata-input'>
          <select
            className='metadata-input__input'
            name='country'
            id='country'
            value={dataset.country || ''}
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <option value=''>Select</option>
            {countries.map((item) => (
              <option key={`format-${item.text}`} value={item.text}>
                {item.text}
              </option>
            ))}
          </select>
          <label className='metadata-label' htmlFor='encoding'>
            Country
          </label>
        </div>
        <div className='metadata-input'>
          <input
            className='metadata-input__input'
            type='text'
            name='city'
            id='city'
            value={dataset.city}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className='metadata-label' htmlFor='city'>
            City
          </label>
        </div>
      </div>
      <h1 className='metadata-section-title'>
        <b>Time</b>
      </h1>
      <div className='metadata-form'>
        <div className='metadata-input'>
          <select
            className='metadata-input__input'
            name='periodicity'
            id='periodicity'
            value={dataset.periodicity || ''}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          >
            <option value=''>Select</option>
            <option value='Yearly'>Yearly</option>
            <option value='Biannual'>Biannual</option>
            <option value='Quarterly'>Quarterly</option>
            <option value='Monthly'>Monthly</option>
            <option value='Daily'>Daily</option>
          </select>
          <label className='metadata-label' htmlFor='periodicity'>
            <span className='ast-important'>*</span> Periodicity
          </label>
        </div>
        <div className='metadata-input'>
          <textarea
            className='metadata-input__textarea'
            type='text'
            name='years_included'
            id='years_included'
            placeholder='2015, 2016, 2017, 2005'
            value={dataset.years_included || ''}
            onChange={(e) => {
              handleChange(e);
            }}
            rows={1}
          ></textarea>
          <label className='metadata-label' htmlFor='years_included'>
            {' '}
            Years included
          </label>
        </div>
      </div>

      <h1 className='metadata-section-title'>
        <b>Fiscal Period</b>
      </h1>
      <div className='metadata-form'>
        <div className='metadata-input'>
          <input
            className='metadata-input__input'
            type='date'
            name='start_date'
            id='start_date'
            value={dataset.start_date}
            required
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className='metadata-label' htmlFor='start_date'>
            <span className='ast-important'>*</span> Starting date
            (month/day/year)
          </label>
        </div>
        <div className='metadata-input'>
          <input
            className='metadata-input__input'
            type='date'
            name='end_date'
            id='end_date'
            value={dataset.end_date}
            required
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className='metadata-label' htmlFor='end_date'>
            <span className='ast-important'>*</span> Ending date
            (month/day/year)
          </label>
        </div>
      </div>
      <h1 className='metadata-section-title'>
        <b>Encoding and file format</b>
      </h1>
      <div className='metadata-form'>
        <div className='metadata-input'>
          <select
            className='metadata-input__input'
            name='encoding'
            id='encoding'
            value={dataset.encoding || ''}
            onChange={(e) => {
              handleChange(e);
            }}
            required
          >
            <option value='utf_8'>UTF-8</option>
            {encodeData.map((item) => (
              <option key={`format-${item.value}`} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <label className='metadata-label' htmlFor='encoding'>
            <span className='ast-important'>*</span> File encoding: If you are
            unsure about this setting, please use UTF-8
          </label>
        </div>
        <div className='metadata-input'>
          <select className='metadata-input__input' name='format' id='format'>
            <option value='csv'>CSV</option>
          </select>
          <label className='metadata-label' htmlFor='format'>
            File format
          </label>
        </div>
      </div>
    </>
  );
};

Metadata.propTypes = {
  dataset: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Metadata;
