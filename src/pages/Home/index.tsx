import React, { useCallback } from 'react';
import { Container, Content} from './styles';
import Header from './components/Header';
import Title from './components/Title'
import Card from './components/Card';
import {List} from './styles';

import {
  ActivityIndicator,
  ListRenderItemInfo,
  StyleSheet,
  Text
} from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from 'rn-placeholder';
import { useInfiniteQuery } from 'react-query';


type ApiResultItem = {
  name: string;
  url: string;
};


type PokemonApiResult = {
  count: number;
  next?: string;
  previous?: string;
  results: ApiResultItem[];
};


type PokemonCardData = {
  id: number;
  name: string;
  image: string;
};
const fetchPokemons = async ({ pageParam = 0 }): Promise<PokemonApiResult> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=20`
  );
  if (!response.ok) {
    throw new Error('Falha ao buscar pokémons na API.');
  }
  return response.json();
};

const usePaginationList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery( 
    'pokemons', 
    fetchPokemons,
    {
      
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.next) {
          return allPages.length * 20;
        }
        return undefined;
      },
    }
  );

  const pokemons: PokemonCardData[] =
    data?.pages
      .flatMap((page) => page.results)
      .map((pokemon) => {
        const id = Number(pokemon.url.split('/').filter(Boolean).pop());
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        return {
          id,
          name: pokemon.name,
          image,
        };
      }) ?? [];

  return {
    data: pokemons,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  };
};

const SkeletonItem = () => (
  <Placeholder
    style={styles.placeholder}
    Animation={Fade}
    Left={() => <PlaceholderMedia style={styles.placeholderMedia} size={80} isRound />}
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
    error,
  } = usePaginationList();

  const skeletonData = React.useMemo(() => Array.from({ length: 10 }), []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<PokemonCardData>) => {

  return (
    <Text style={{ padding: 20, fontSize: 16 }}>
      {item.id}: {item.name}
    </Text>
  );
}, []);
  
  const loadMorePosts = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  
  const ListFooter = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator style={styles.footerIndicator} color={'#C70039'} size="large" />;
  };
  
  if (error) {
    return (
      <Container>
        <Header />
        <Content style={styles.errorContainer}>
          <Text style={styles.errorText}>Ocorreu um erro ao carregar.</Text>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Content>
        <Title />
        <List
          data={isLoading ? skeletonData : pokemons}
          renderItem={isLoading ? SkeletonItem : renderItem}
          keyExtractor={(item: any, index: number) => `item-${item.id || index}`}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={ListFooter}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={11}
        />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  placeholder: { marginBottom: 20, paddingHorizontal: 20 },
  placeholderMedia: { marginRight: 15 },
  footerIndicator: { marginVertical: 20 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16 }
});

export default Home;