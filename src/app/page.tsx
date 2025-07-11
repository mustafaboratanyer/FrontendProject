'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTohumContext } from "./context/TohumContext";
import styles from "./Home.module.css";

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [seeds, setSeeds] = useState<number[]>([]);
  const [seedStages, setSeedStages] = useState<{[key: number]: string}>({});
  const [seedTypes, setSeedTypes] = useState<{[key: number]: 'basic' | 'premium'}>({});
  const [selectedSeedType, setSelectedSeedType] = useState<'basic' | 'premium'>('basic');
  const router = useRouter();
  
  const { balance, basicSeeds, premiumSeeds, setBalance, setBasicSeeds, setPremiumSeeds } = useTohumContext();

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

  const goToStore = () => {
    router.push("/store");
  };

  const getSeedImage = (stage: string, isBasic: boolean) => {
    if (isBasic) {

        switch(stage) {
        case 'T': return '/Seeding.png'; 
        case 'F': return '/LittlePlant.png'; 
        case 'B': return '/MiddlePlant.png'; 
        case 'Ç': return '/Daisy.png';
        case 'K': return '/DriedDaisy.png'; 
      }
    } else {

        switch(stage) {
        case 'T': return '/Seeding.png'; 
        case 'F': return '/LittlePlant.png';
        case 'B': return '/MiddlePlant.png';
        case 'Ç': return '/Tulip.png'; 
        case 'K': return '/DriedTulip.png'; 
      }
    }
  };

  const handleSquareClick = (index: number) => {
    if (!seeds.includes(index)) {

        if (selectedSeedType === 'basic' && basicSeeds > 0) {
        setSeeds([...seeds, index]);
        setBasicSeeds(basicSeeds - 1);
        setSeedTypes(prev => ({...prev, [index]: 'basic'}));
        growSeed(index);
      } else if (selectedSeedType === 'premium' && premiumSeeds > 0) {
        setSeeds([...seeds, index]);
        setPremiumSeeds(premiumSeeds - 1);
        setSeedTypes(prev => ({...prev, [index]: 'premium'}));
        growSeed(index);
      } else {
        alert("Seçtiğin tohum türünden yok!");
      }
    }
    else if (seeds.includes(index)) {

        if (seedStages[index] === 'Ç') {
        const isBasic = seedTypes[index] === 'basic';
        const harvestReward = isBasic ? 20 : 40; 
        setBalance(balance + harvestReward);
      }
      
      setSeeds(seeds.filter(s => s !== index));
      setSeedStages(prev => {
        const newStages = {...prev};
        delete newStages[index];
        return newStages;
      });
      setSeedTypes(prev => {
        const newTypes = {...prev};
        delete newTypes[index];
        return newTypes;
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
    return <div>Yükleniyor</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.gameInfo}>
          <span className={styles.balance}>Balance: {balance}</span>
          <span className={styles.inventory}>Temel: {basicSeeds} | Premium: {premiumSeeds}</span>
        </div>
        <h1>Tohum Dikme Oyunu</h1>
        <div className={styles.headerButtons}>
          <button className={styles.storeButton} onClick={goToStore}>
            Store
          </button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Çıkış Yap
          </button>
        </div>
      </div>
      
      <div className={styles.seedSelector}>
        <h3>Tohum Seç:</h3>
        <div className={styles.seedOptions}>
          <button 
            className={`${styles.seedOption} ${selectedSeedType === 'basic' ? styles.selected : ''}`}
            onClick={() => setSelectedSeedType('basic')}
          >
            Temel Tohum ({basicSeeds})
          </button>
          <button 
            className={`${styles.seedOption} ${selectedSeedType === 'premium' ? styles.selected : ''}`}
            onClick={() => setSelectedSeedType('premium')}
          >
            Premium Tohum ({premiumSeeds})
          </button>
        </div>
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
                <div className={`${styles.seed} ${seedTypes[index] === 'premium' ? styles.premiumSeed : ''}`}>
                  <Image 
                    src={getSeedImage(seedStages[index] || 'T', seedTypes[index] === 'basic')} 
                    alt={`${seedTypes[index] === 'basic' ? 'Basic' : 'Premium'} Seed Stage ${seedStages[index] || 'T'}`}
                    width={40}
                    height={40}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}