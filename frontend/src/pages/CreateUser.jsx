import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import FormContainer from "../components/FormContainer";

function CreateUser() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/users", { name });
      toast.success(`Welcome, ${res.data.data.name}`);
      navigate(`/dashboard/${res.data.data._id}`);
    } catch (error) {
      console.error("Error registering user", error);
      toast.error("Failed to register user");
    }
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Register User
      </h2>

      <InputField
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <PrimaryButton text="Register" type="submit" />
    </FormContainer>
  );
}

export default CreateUser;
