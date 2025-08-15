import { StatusBar } from 'expo-status-bar';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';

// IMPORTAÇÃO STYLESHEET
import { StyleSheet } from 'react-native';

// IMPORTAÇÃO NAVIGAÇÃO
import { useNavigation } from '@react-navigation/native';

// UTILIZA PARA A BARRA DE BOTÃO SEMPRE SEJA PRIORIDADE
import { SafeAreaView } from 'react-native-safe-area-context';
import { removeItem } from '../components/AsyncStorage';

export default function HomeScreen() {

  // DECLARANDO NAVIGATION
  const navigation = useNavigation();

  // FAZENDO FUNÇÃO DO BOTÃO ENVIAR PARA PAGINA HOME
  const handleReset = async () => {
    navigation.push("Onboarding");
    await removeItem("onboarded");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} >Seja bem vindo a página home!</Text>
      <Text style={styles.subtitle} >Confira top 10 filmes famosos no momento!</Text>
      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset} style={styles.movieButton}>
        <Text>CATALOGO DE FILME</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
