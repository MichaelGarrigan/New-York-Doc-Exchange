
/*
@name: addIndexProperty

@param: {Array} data : the result of the Better Doctors Api 
@return void
*/

export default data => {
  data.forEach( (item, idx) => { item.index = idx + 1 });
};