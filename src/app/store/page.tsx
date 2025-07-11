'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTohumContext } from "../context/TohumContext";
import styles from "../Home.module.css";

export default function StorePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const { balance, basicSeeds, premiumSeeds, buyBasicSeed, buyPremiumSeed } = useTohumContext();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      router.push("/signin");
    }
  }, [router]);

  const handleBack = () => {
    router.push("/");
  };

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
        <div className={styles.gameInfo}>
          <span className={styles.balance}>Balance: {balance}</span>
          <span className={styles.inventory}>Temel: {basicSeeds} | Premium: {premiumSeeds}</span>
        </div>
        <h1>Tohum Mağazası</h1>
        <div className={styles.headerButtons}>
          <button className={styles.storeButton} onClick={handleBack}>
            Ana Sayfa
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Çıkış Yap
          </button>
        </div>
      </div>
      
      <div className={styles.store}>
        <h2>Tohum Mağazası</h2>
        <div className={styles.storeItems}>
          <div className={styles.storeItem}>
            <h3>Temel Tohum</h3>
            <p>Fiyat: 10 Para</p>
            <p>Normal tohum</p>
            <p>Hasat getirisi: 20 Para</p>
            <button className={styles.buyButton} onClick={buyBasicSeed}>
              Satın Al
            </button>
          </div>
          <div className={styles.storeItem}>
            <h3>Premium Tohum</h3>
            <p>Fiyat: 20 Para</p>
            <p>Verimli tohum</p>
            <p>Hasat getirisi: 40 Para</p>
            <button className={styles.buyButton} onClick={buyPremiumSeed}>
              Satın Al
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
