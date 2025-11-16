"use client";

import { FormEvent, memo, useState } from "react";

const QuizForm = () => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");

  if (status === "success") {
    return <h1>That&apos;s right!</h1>;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City Quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>

      <form onSubmit={handleSubmit} action="">
        <textarea
          value={answer}
          disabled={status === "submitting"}
          onChange={handleTextareaChange}
          name=""
          id=""
        />
        <br />
        <button disabled={answer.length === 0 || status === "submitting"}>
          Submit
        </button>
        {error !== null && <p>{error?.message}</p>}
      </form>
    </>
  );
};

function submitForm(answer: string) {
  // Pretends its hitting the network

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== "lima";

      if (shouldError) {
        reject(new Error("Good geuss but a wrong asnwer. Try again!"));
      } else {
        resolve();
      }
    }, 1500);
  });
}

export default memo(QuizForm);
