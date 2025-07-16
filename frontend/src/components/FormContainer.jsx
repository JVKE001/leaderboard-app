function FormContainer({ children, onSubmit }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-400 to-amber-500 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        {children}
      </form>
    </div>
  );
}

export default FormContainer;
