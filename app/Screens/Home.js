import React, {Component } from 'react';
import {  View , SafeAreaView, ScrollView, ActivityIndicator,Alert,Platform,TouchableOpacity,Text } from 'react-native';
import {SearchBar,Button,Divider } from 'react-native-elements'
import {connect} from 'react-redux';
import { WebView } from 'react-native-webview';
import * as favoritesAction from '../store/actions/favoriteAction'
import * as wikiAction from '../store/actions/wikiAction'

import { styles } from '../style/style';
import LaunchCard from '../Common/LaunchCard';

//Home page class component include all launches
class Home extends Component {
  //Constructor
  constructor(props){
    super(props)
    this.launchesAPI = 'https://ll.thespacedevs.com/2.0.0/launch'
    //States
    this.state={
                search: '',// text from the search var
                launches:[{
                  results:[]
                }], //list of all the launches
                }
  }

  /**
   * Call before the first rendering.
   * reference : https://stackoverflow.com/questions/65662673/react-native-fetch-data-from-api-and-displaying/65662797
   */
   async componentDidMount(){

     await fetch(this.launchesAPI) // request data about 10 launches from API
      .then((response) => response.json()) //Response from request 
      .then((json) => {
        this.setState({launches:json})
      })
      .catch((error) => console.error(error)).finally(()=>{
        this.props.is_Loading(false)
      })
    }
 
  /**
   * Move to previous 10 launches page
   * If no have previuos data alert to user
   */
  prevPage = ()=>{
    if(this.state.launches.previous!=null){
    this.props.is_Loading(true)
     fetch(this.state.launches.previous) //Request data about previous 10 launches from API
    .then((response) => response.json())
    .then((json) => {
      this.setState({launches:json})
    })
    .catch((error) => console.error(error)).finally(()=>{
      this.props.is_Loading(false)
    })
  }
  else{
    //Alert  to user if on have previous data
    Alert.alert(
      "Error",
      "No previous data",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  }
   }
 
  /**
   * Move to next 10 launches page
   * If no have more data alert to user
   */
  nextPage = ()=>{
    if(this.state.launches.next!=null){
      this.props.is_Loading(true)
      fetch(this.state.launches.next) //request data about next 10 launches from API
      .then((response) => response.json())
      .then((json) => {
        this.setState({launches:json})

      })
      .catch((error) => console.error(error)).finally(()=>{
        this.props.is_Loading(false)

      })
  }
  else{
      //Alert to user if on have data
    Alert.alert(
      "Error",
      "No more data",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }
   }
  
    /**
   * Search launches by name
   * @param {String} search The text from SearchBar
   */
  updateSearch = (search) => {
    this.setState({ search:search })
  };

  /**
   * Return to application from Wiki WebView
   */
  handleBackButton = () => {
    this.props.showWiki(false,this.props.wikiURL)
  };
  

    /**
 * Return WebView with wiki page
 * reference : https://heartbeat.fritz.ai/how-to-handle-navigation-with-webviews-in-a-react-native-app-1ed51ab3342f
 * @return {View}  contain WebView with wiki page
 */
renderContent() {
  return (
    <View style={{flex:1}}>
      {console.log(this.props.wikiURL)}
    <WebView
      source={{
         uri: this.props.wikiURL,
      }}
      startInLoadingState={true}
      renderLoading={() => (
        <ActivityIndicator
          color='black'
          size='large'
          style={styles.flexContainer}
        />
      )}
  /> 
    {/*Back to application button */}
    <TouchableOpacity onPress={this.handleBackButton}>
        <Text style={styles.back_button}>Back To Application</Text>
      </TouchableOpacity>
    </View>

  );
 }
  render() {
    return (
        <View style={{flex:1}}>
        {/*Check if to show the WebView */}
         {this.props.showWebView ? 
          this.renderContent()
         :
         <SafeAreaView style={styles.container}>
        {/*SearchBar to search launches by name */}
          <SearchBar
                onChangeText={this.updateSearch}
                value={this.state.search}
                containerStyle={{backgroundColor: '#f5f5f5'}}
                platform={Platform.OS}
                placeholder="Search launches..."
          />
          <View style={{ flexDirection:"row", justifyContent: 'center', alignItems: 'center' }}>
              {/*Previous and Next buttons */}
              <Button
                style={styles.btn}
                title="<< Previous"
                type="outline"
                onPress = {this.prevPage}
              />
              {/*Space between the buttons */}
              <View style={styles.space} /> 
              <Button
                  style={styles.btn}
                  title="Next >>"
                  type="outline"
                  onPress= {this.nextPage}
              />

            </View>
            <ScrollView style ={{width:'100%'}} >
            {
              /*
               * Check if page is loading 
               * if yes show a spinner
               * else show launches list
              */
            this.props.isLoading ? <ActivityIndicator size="large"  />
            :
            /* Check  if the launches exist */
            typeof(this.state.launches.detail)!=='undefined'  ? 
            <View>
              {            console.log(this.state.launches.detail)
}
               { Alert.alert(
              "Error",
              "Request was throttled",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            )}
            </View>
            :
          this.state.launches?.results?.map((u, i) => {
                /*
                 * Check if the search bar empty or the length of the text less 3 characters then return all launches cards 
                 * else return only the cards in the currnet page that contain the text from search bar
                */         
               if(this.state.search=== '' || this.state.search.length <3  ){
              return (       
                <View key={i} >
                    {
                  /**Create a card for each launch
                   * Cards style taken from : https://github.com/SiDevesh/React-Native-Material-Cards
                   */
                    }
                    <LaunchCard name={u.name} image={u.image} country={u.pad.location.name} date={u.net} url={u.rocket.configuration.url} status={u.status.name} />
                    <Divider orientation="horizontal" />
                </View>
              );
              }
              else{
                /*Show only the launches cards that includes the search box text */
                if( u.name.toLowerCase().includes(this.state.search.toLowerCase())){
                  return ( 
                    <View key={i} >
                        {/*Create a card for each launch*/}
                        <LaunchCard name={u.name} image={u.image} country={u.pad.location.name} date={u.net} url={u.rocket.configuration.url} status={u.status.name} />   
                    </View>
    
                  );
                }
              }      
            }
            )

          }    
     </ScrollView>
    </SafeAreaView>
        }
        </View>
    );
  }
}
/**
 * Map the global favorites state to props
*/
const mapStateToProps = state =>{
    return {
        ...state.favorites,
        ...state.wiki

    }
}
/**
 * Map the dispatch to props
*/
const mapDispatchToProps =dispatch =>{
    return {
      addToFavorites:(name,image,date,status,country,wiki)=>{
        dispatch(favoritesAction.addToFavorites(name,image,date,status,country,wiki));
    },
    removeFromFavorites:(name)=>{
      dispatch(favoritesAction.removeFromFavorites(name));
  },
    showWiki: (showWebView,wikiURL) =>{
      dispatch(wikiAction.showWiki(showWebView,wikiURL));

    },
    is_Loading : (isLoading) =>{
      dispatch(wikiAction.is_Loading(isLoading))
    }
}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps)(Home);