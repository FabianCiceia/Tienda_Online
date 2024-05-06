import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';

const CategoryRange = ({plainOptions=['Arduino', 'ESP32', 'Capacitores'], setCategory, category}) => {
    // const plainOptions = ['Apple', 'Pear', 'Orange'];
    useEffect(()=>{
        setCategory(plainOptions);
    },[])
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(true);
    // const [category, setCategory] = useState(plainOptions);
    // console.log(category)
    const onCheckAllChange = (e) => {
        setCategory(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const onChange = (checkedValues) => {
        setCategory(checkedValues);
        setIndeterminate(!!checkedValues.length && checkedValues.length < plainOptions.length);
        setCheckAll(checkedValues.length === plainOptions.length);
    };

    return (
        <div className='categoryRange'>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Todas las categorias
        </Checkbox>
        <Checkbox.Group className='categoryRangeGroup' options={plainOptions} value={category} onChange={onChange} />
        </div>
    );
};

export default CategoryRange;
