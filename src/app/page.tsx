'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Home.module.css";

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [balance, setBalance] = useState(100);
  const [seeds, setSeeds] = useState<number[]>([]);
  const [seedStages, setSeedStages] = useState<{[key: number]: string}>({});
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

  const handleSquareClick = (index: number) => {

    if (!seeds.includes(index) && balance >= 10) {
      setSeeds([...seeds, index]);
      setBalance(balance - 10);
      growSeed(index);
    }

    else if (seeds.includes(index)) {

        if (seedStages[index] === 'Ç') {
        setBalance(balance + 10);
      }
      
      setSeeds(seeds.filter(s => s !== index));
      setSeedStages(prev => {
        const newStages = {...prev};
        delete newStages[index];
        return newStages;
      });
    }
  };

  const growSeed = (index: number) => {

    setSeedStages(prev => ({...prev, [index]: 'T'}));
    
    setTimeout(() => {
      setSeedStages(prev => ({...prev, [index]: 'F'}));
    }, 2000);
    
    setTimeout(() => {
      setSeedStages(prev => ({...prev, [index]: 'B'}));
    }, 4000);
    
    setTimeout(() => {
      setSeedStages(prev => ({...prev, [index]: 'Ç'}));
    }, 6000);
    
    setTimeout(() => {
      setSeedStages(prev => ({...prev, [index]: 'K'}));
    }, 10000);
  };

  if (!currentUser) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.gameInfo}>
          <span className={styles.balance}>Balance: {balance}</span>
        </div>
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
              onClick={() => handleSquareClick(index)}
            >
              {seeds.includes(index) && (
                <div className={styles.seed}>
                  {seedStages[index] || 'T'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}