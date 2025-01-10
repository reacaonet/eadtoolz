import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Channel } from '../types/channel';
import { CategoryFilter } from '../components/CategoryFilter';
import { VideoPlayer } from '../components/VideoPlayer';
import { useAuthContext } from '../context/AuthContext';

export function Browse() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const channelsRef = collection(db, 'channels');
        const q = query(channelsRef, where('active', '==', true));
        const querySnapshot = await getDocs(q);
        
        const channelsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate()
        })) as Channel[];

        setChannels(channelsData);
      } catch (error) {
        console.error('Error loading channels:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChannels();
  }, []);

  const categories = Array.from(new Set(channels.map(channel => channel.category)));
  const filteredChannels = selectedCategory === 'all'
    ? channels
    : channels.filter(channel => channel.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando canais...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Canais Disponíveis</h1>
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredChannels.map((channel) => (
            <div 
              key={channel.id}
              className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-red-600 transition-all cursor-pointer"
              onClick={() => setSelectedChannel(channel)}
            >
              <div className="aspect-video relative bg-gray-800">
                {channel.logo ? (
                  <img 
                    src={channel.logo} 
                    alt={channel.name}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {channel.name[0]}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium">{channel.name}</h3>
                <p className="text-gray-400 text-sm">{channel.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedChannel && (
        <VideoPlayer
          channel={selectedChannel}
          onClose={() => setSelectedChannel(null)}
        />
      )}
    </div>
  );
}