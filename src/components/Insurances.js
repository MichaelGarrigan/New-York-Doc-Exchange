import React from 'react';

import MedIcon from './svg/medical.js';
import DenIcon from './svg/dental.js';
import '../styles/Body.less';

// alphabetically sort insurances (mutates 'list')
const sortArray = list => {
  list.sort( (a,b) => {
    const x = a.name;
    const y = b.name;
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
  });
  
  return list;
};

const consolidateInsurances = list => {

  // list an array of objects
  // Here we want one provider with all the subcategories in 'plan' 
  let arrToObj = {};
  list.forEach(item => {
    const name = item.insurance_provider.name;

    if ( arrToObj[name] ) { // this name is in our object
      arrToObj[name].plans.push(
        {
          category: item.insurance_plan.category[0],
          name: item.insurance_plan.name
        }
      ) 
    } else { // this name is NOT in our object
      arrToObj[name] = {
        plans: [
          {
            category: item.insurance_plan.category[0],
            name: item.insurance_plan.name
          }
        ]
      }
    }
  });
  
  // Convert the object back to an array
  let newList = [];
  for (const item in arrToObj) {
    newList.push({ 
      name: item,
      plans: arrToObj[item].plans
    });
  };
  
  return sortArray(newList);
};


export default ({ insurances }) => {
  // verify insurances is not empty array
  if ( insurances.length === 0) {
    return "No Insurance Accepted";
  }

  // consolidate insurances
  const newList = consolidateInsurances(insurances);
  
  return (
    newList.map( item => (
        <div className="insurance-wrapper" key={item.name}>
          
          <div className="insurance-provider">
            {item.name}
          </div>
          {
            item.plans.map( plan => (
              <div className="insurance-plan-flex" key={plan.name}>
                {
                  plan.category === 'medical'
                    ? <MedIcon />
                    : <DenIcon />
                }
                <div className="insurance-plan-name">
                  {plan.name}
                </div>
              </div>
            ))
          }
        </div>
      )
    )
  )
};