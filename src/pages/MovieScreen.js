import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

//IMPORTAÇÃO REANIMATED
import Animated,
{
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate
} from 'react-native-reanimated';

//IMPORTAÇÃO AXIOS
import axios from 'axios';

const { width } = Dimensions.get("screen")
const imageWidth = width * 0.7;
const imageHeight = imageWidth * 1.76;
const spacing = 12

// FUNÇÃO BACKDROPHOTO

function BackdropPhoto({ photo, index, scrollX }) {
  const stylez = useAnimatedStyle(() => {
    return {

      opacity: interpolate(scrollX.value, [index - 1, index, index + 1], [0, 1, 0])
    }
  })
  return (
    <Animated.Image source={{ uri: photo.src.large }} style={[StyleSheet.absoluteFillObject, stylez]} blurRadius={10} />
  )
}

// FUNÇÃO PHOTO

function Photo({ item, index, scrollX }) {
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scrollX.value, [index - 1, index, index + 1], [1.6, 1, 1.6])
        },
        {
          rotate: `${interpolate(scrollX.value, [index - 1, index, index + 1], [15, 1, -15])}deg`
        }
      ]
    }
  })
  return (
    <View style={{ width: imageWidth, height: imageHeight, overflow: "hidden", borderRadius: 20 }}>
      <Animated.Image source={{ uri: item.src.large }} style={[{ flex: 1 }, stylez]} />
    </View>
  )
}

export default function App() {

  const [data, setData] = useState({ photos: [] });

  // useSharedValue => Reativo as animações, quando o nosso scrollX.value for alterado
  // todas as animações a serem alteradas.
  const scrollX = useSharedValue(0);

  // useAnimationScrollHandler => Hook do reanimated,que serve para "escutar" o evento de
  // rolagem (onScroll) da nossa lista
  const onScroll = useAnimatedScrollHandler((e) => {
    // e.contentOffset.x => Distância em pixels que a lista ja foi rolada na horizontal
    scrollX.value = e.contentOffset.x / (imageWidth + spacing);
  })

  // Função que pega as imagens
  useEffect(() => {
    fetchData();
  }, [])

  // Função que pega a requisição da API
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "",
        {
          headers: { Authorization: "" }
        });
      setData(res.data),
        console.log(res.data)
    } catch (error) {
      console.log("Erro ao buscar as imagens: ", error)
    }
  }

  // CASO A FUNÇÃO DA REQUISIÇÃO DA API AINDA TIVER CARREGANDO ELE MOSTRARA ESSA TELA
  if (data.photos.length === 0) {
    return (
      <View>
        <Text>Carregando, aguarde um momento ...</Text>
      </View>
    )
  }


  return (
    <View style={styles.container}>

      <View style={StyleSheet.absoluteFillObject}>
        {data.photos.map((photo, index) => (
          <BackdropPhoto key={photo.id} photo={photo} index={index} scrollX={scrollX} />
        ))}
      </View>

      <Animated.FlatList
        data={data.photos}
        keyExtractor={(item) => String(item.id)}
        horizontal
        style={{ flexGrow: 0 }}
        snapToInterval={imageWidth + spacing}
        // snapToInteval => faz com que a rolagem pare exatamente a cada intervalo especificado
        // nessse caso, o tamnaho da imagem, maio o gap (spacing).

        decelerationRate={"fast"}
        // decelerationRate => Controla a velocidade da desaceleração da nossa rolagem

        contentContainerStyle={{
          gap: spacing,
          paddingHorizontal: (width - imageWidth) / 2
        }}
        // contentContainerStyle => Aplicar estilo no conteúdo interno do nosso FLATLIST

        renderItem={({ item, index }) => <Photo item={item} index={index} scrollX={scrollX} />}
        onScroll={onScroll}
        // onScroll => Função chama enquanto rolamos nossa "lista"

        scrollEventThrottle={16}
        // scrollEventThrottle => Define a frequência que o evento onScroll é chamado (60FPS)

        showsHorizontalScrollIndicator={false}
      // showsHorizontalScrollIndicator => Oculta a "barrinha" horizontal da nossa rolagem

      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
