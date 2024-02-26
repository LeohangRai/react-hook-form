import './App.css';
import FormWithReactHookForm from './components/form-with-rhf';

function App() {
  return (
    <main className="flex min-h-screen min-w-[400px] flex-col items-center justify-between p-24">
      {/* <FormWithoutReactHookForm /> */}
      <FormWithReactHookForm />
    </main>
  );
}

export default App;
