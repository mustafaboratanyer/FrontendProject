'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Home.module.css";

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      router.push("/signin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/signin");
  };

  if (!currentUser) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Tohum Dikme Oyunu</h1>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Çıkış Yap
        </button>
      </div>
      
      <div className={styles.gameArea}>
        <div className={styles.grid}>
          {Array.from({ length: 16 }, (_, index) => (
            <div 
              key={index} 
              className={styles.square}
            >
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}