import React, { useState } from 'react';

type Props = {
  handleSearch: (value: string) => Promise<void>;
}

export const Form = ({ handleSearch }: Props ) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSearch(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return <form className="form" onSubmit={handleSubmit}>
    <input
      className="form-control"
      name='form-input'
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Text"
    />
    <button type="submit">Search</button>
  </form>
}