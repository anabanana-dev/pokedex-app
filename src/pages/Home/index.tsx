import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  ListRenderItemInfo
} from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from 'rn-placeholder';

import { usePaginationList } from '../../services/pokemons';
import Header from './components/Header';
import Title from './components/Title';
import Card from './components/Card';
import { Container, Content, List } from './styles';
import { PokemonEntity } from '../../services/pokemons/types';


const SkeletonItem = () => (
  <Placeholder
    style={{ marginBottom: 20, paddingHorizontal: 20 }}
    Animation={Fade}
    Left={() => <PlaceholderMedia style={{ marginRight: 15 }} size={80} isRound />}
  >
    <PlaceholderLine width={60} />
    <PlaceholderLine width={40} />
  </Placeholder>
);

const Home = () => {
  const {
    data: pokemons,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = usePaginationList();

  // CORREÇÃO: O array de skeletons é apenas para o loading inicial
  const skeletonData = isLoading ? Array.from(Array(10).keys()) : [];

  // CORREÇÃO: A função de renderização foi simplificada
  const renderItem = useCallback(({ item }: ListRenderItemInfo<PokemonEntity>) => {
    return <Card pokemon={item} />;
  }, []);
  
  // CORREÇÃO: Lógica de paginação simplificada para usar o estado do React Query
  const loadMorePosts = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  
  // Componente para o indicador de carregamento no final da lista
  const ListFooter = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} color={'#C70039'} size="large" />;
  };
  
  if (isLoading) {
    return (
      <Container>
        <Header />
        <Content>
          <Title />
          <List
            data={skeletonData}
            keyExtractor={(item) => `skeleton-${item}`}
            renderItem={SkeletonItem}
          />
        </Content>
      </Container>
    )
  }

  return (
    <Container>
      <Header />
      <Content>
        <Title />
        <List
          data={pokemons}
          renderItem={renderItem}
          // CORREÇÃO: keyExtractor seguro para evitar crashes
          keyExtractor={(item: PokemonEntity) => String(item.id)}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListFooter}
          // Performance
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={11}
        />
      </Content>
    </Container>
  );
};

export default Home;