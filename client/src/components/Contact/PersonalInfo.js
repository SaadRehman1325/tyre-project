import React, { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { getUser, updateUser } from "../../api/user";

export default function PersonalInfo() {
  const { setIsLoading } = useLoading();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [message, setmessage] = useState("");

  const handleSubmit = () => {
    if (username && password && email) {
      setIsLoading(true);
      updateUser({ username, password, email })
        .then((res) => {
          setmessage("Information Updated Successfully");
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUser()
      .then((res) => {
        setIsLoading(false);
        setEmail(res.email);
        setPassword(res.password);
        setUsername(res.username);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setmessage("");
    }, 2000);
  }, [message]);

  return (
    <div>
      <h2>Personal Information</h2>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-4" onClick={handleSubmit}>
        Submit
      </button>
      {message && (
        <div
          class="alert alert-success my-4 w-50 m-auto text-center"
          role="alert"
        >
          <span className="small">{message}</span>
        </div>
      )}
    </div>
  );
}
