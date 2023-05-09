import { useForm } from 'react-hook-form';
import './App.css';
import InputTextController from './components/InputTextController';

function App() {
  const { control, watch, handleSubmit } = useForm();

  const testField = watch('test');

  const onSubmit = (data: any) => {
    console.log('data', data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Test: {testField}</p>
      <InputTextController type="email" required={true} name="test" control={control} />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
