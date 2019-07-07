import React, { Fragment } from 'react';
import constGridTemplateAreas from '../server/helpers/constGridTemplateAreas.js';
import '../styles/Insurances.css';

const consolidateInsurances = list => {
  let listToObject = {};
  let newList = [];

  // here we are iterating over an array of objects
  // we are placing the items into an object based on the name 
  // the idea is to reduce the subcategories of insurance providers 
  list.map(item => {
    
    if ( listToObject[item.insurance_provider.name] ) { // this name is in our object
      listToObject[item.insurance_provider.name].insurance_plan.category.push(item.insurance_plan.category[0]);
      listToObject[item.insurance_provider.name].insurance_plan.name.push(item.insurance_plan.name);
      listToObject[item.insurance_provider.name].insurance_plan.uid.push(item.insurance_plan.uid);
    } else { // this name is NOT in our object
      listToObject[item.insurance_provider.name] = {
        insurance_plan: {
          category: item.insurance_plan.category,
          name: [item.insurance_plan.name],
          uid: [item.insurance_plan.uid]
        },
        insurance_provider: item.insurance_provider
      }
    }
  })

  // now we will convert the object back to an array
  for (const item in listToObject) {
    newList.push(listToObject[item]);
  };
  
  return newList;
};

// this mutates the list into a alphabetically sorted array
const sortArray = list => {

  list.sort( (a, b) => {
    console.log('A: ', a.insurance_provider.name);
    console.log('B: ', b.insurance_provider.name);
    return a.insurance_provider.name - b.insurance_provider.name; 
  });
  
  return list;
};


const Insurances = ({ insurances }) => {
  // verify insurances is not empty array
  if ( insurances.length === 0) {
    return "No Insurance Accepted";
  }

  // consolidate insurances
  const newList = consolidateInsurances(insurances);
  console.log('newList Before: ', newList);
  // alphabetically sort insurances
  sortArray(newList);
  console.log('newList: ', newList);

  return (
    newList.map( (item, idx) => {
      const len = item.insurance_plan.category.length;
      
      return (
        <div className="doctor-insurance-wrapper">
          <div 
            className="doctor-insurance-grid"
            style={{
              gridTemplateAreas: `${constGridTemplateAreas[len + ""]}`,
              gridTemplateRows: `repeat(${len + 1}, 1fr)`
            }}
          >
            <div className="doctor-provider">
              {item.insurance_provider.name}
            </div>
           {
             item.insurance_plan.category.map( (cat, i) => {
              return (
                <Fragment key={i} >
                  <div 
                    className={`${cat === 'medical' ? 'medical-icon' : 'dental-icon'} icon${i}`}
                  ></div>
                  <div className={`doctor-plan plan${i}`}>
                    {item.insurance_plan.name[i]}
                  </div>
                </Fragment>
               )
             })
           }
          </div>
        </div>
      );
    })
  )
};

export default Insurances;