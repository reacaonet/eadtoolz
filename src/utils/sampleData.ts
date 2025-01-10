import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const sampleChannels = [
  {
    name: 'Globo HD',
    category: 'Abertos',
    logo: 'https://logodownload.org/wp-content/uploads/2013/12/rede-globo-logo.png',
    active: true,
    url: 'http://sua-url-do-iptv.com/live/seu-usuario/sua-senha/1234.m3u8',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: 'SBT HD',
    category: 'Abertos',
    logo: 'https://logodownload.org/wp-content/uploads/2013/12/sbt-logo.png',
    active: true,
    url: 'http://sua-url-do-iptv.com/live/seu-usuario/sua-senha/5678.m3u8',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: 'ESPN Brasil HD',
    category: 'Esportes',
    logo: 'https://logodownload.org/wp-content/uploads/2015/05/espn-logo.png',
    active: true,
    url: 'http://sua-url-do-iptv.com/live/seu-usuario/sua-senha/9012.m3u8',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: 'TNT HD',
    category: 'Filmes',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/TNT_Logo_2016.svg/1200px-TNT_Logo_2016.svg.png',
    active: true,
    url: 'http://sua-url-do-iptv.com/live/seu-usuario/sua-senha/3456.m3u8',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: 'Cartoon Network HD',
    category: 'Infantil',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cartoon_Network_2010_logo.svg/1200px-Cartoon_Network_2010_logo.svg.png',
    active: true,
    url: 'http://sua-url-do-iptv.com/live/seu-usuario/sua-senha/7890.m3u8',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  }
];

export async function addSampleChannels() {
  try {
    const channelsRef = collection(db, 'channels');
    
    for (const channel of sampleChannels) {
      await addDoc(channelsRef, channel);
    }
    
    console.log('Canais de exemplo adicionados com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar canais:', error);
  }
}