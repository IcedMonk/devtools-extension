import FieldState from './components/FieldState';
import FormIdSelector from './components/FormIdSelector';
import FormState from './components/FormState';
import Input from './components/Input';
import { useGetData } from './helpers/get-data';
import styles from './styles/Devtools.module.css';
import './styles/global.css';
import React, { useState } from 'react';

const Devtools: React.FC = () => {
  const data = useGetData();

  const [formId, setFormId] = useState('');
  const [filteredFieldName, setFilteredFieldName] = useState('');

  if (!data[formId]) {
    return (
      <div className={styles.main}>
        <FormIdSelector
          ids={['Select a ID...', ...Object.keys(data)]}
          id={formId}
          onChange={setFormId}
        />
        <h1 style={{ textAlign: 'center' }}>Please Select a Form ID</h1>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <FormIdSelector
          ids={Object.keys(data)}
          id={formId}
          onChange={setFormId}
        />
        <Input
          placeholder="Filter name..."
          value={filteredFieldName}
          onChange={setFilteredFieldName}
        />
      </div>
      <div className={styles.middle}>
        {Object.keys(data[formId].formValues)
          .filter((fieldName) =>
            fieldName.toLowerCase().includes(filteredFieldName.toLowerCase()),
          )
          .map((fieldName) => (
            <FieldState
              key={fieldName}
              name={fieldName}
              hasError={false}
              isNative
              state={{
                value: data[formId].formValues[fieldName],
                touched: !!data[formId].formState.touchedFields[fieldName],
                dirty: !!data[formId].formState.dirtyFields[fieldName],
              }}
            />
          ))}
      </div>
      <div>
        <FormState state={data[formId].formState as any} />
      </div>
    </div>
  );
};

export default Devtools;
