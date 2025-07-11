'use client';
import { useState } from "react";
import styles from "./SignIn.module.css";

export default function SignInPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((user: {name: string, password: string}) => user.name === name && user.password === password);
    if (found) {
      alert("Giriş başarılı!");
    } else {
      alert("Kullanıcı adı veya şifre yanlış!");
    }
  }

  return (
    <div className={styles.centerContainer}>
      <form className={styles.formBox} onSubmit={handleSignIn}>
        <h2>Sign In</h2>
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
        <button className={styles.button} type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}
