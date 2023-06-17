export const updateObject = (oldObject, newObject) => {
    console.log('inside helper func', oldObject);
    const newData = Object?.entries(oldObject);
    newData.forEach(item => {
        const key = item[0];
        const value = item[1];

        if (newObject.hasOwnProperty(key)) {
            oldObject[key] = newObject[key];
        }
    });
    return oldObject;
};
