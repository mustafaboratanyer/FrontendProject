'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SignUp.module.css";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    users.push({ name, password });

    localStorage.setItem("users", JSON.stringify(users));
    router.push("/signin");
  }

  return (
    <div className={styles.centerContainer}>
      <form className={styles.formBox} onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        <input
          className={styles.input}
          type="text"
          placeholder="Kullanıcı adı"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}

    
  


