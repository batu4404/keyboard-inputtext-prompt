import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import KeyboardTextInputPrompt from './KeyboardTextInputPrompt';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibleInputPrompt: false,
            inputValue: '',
            placeholder: 'Enter your name'
        }
    }

    onFocus = () => {
        this.setState({
            visibleInputPrompt: true,
        })
    } 


    onClose = () => {
        this.setState({
            visibleInputPrompt: false,
        })
    }

    onEndEditing = (inputValue) => {
        this.setState({
            inputValue: inputValue,
        })
    }

    render() {
		console.log('visible', this.state.visibleInputPrompt);
        return(
            <View style={styles.container}>
                <TextInput 
                    placeholder={this.state.placeholder}
                    style={styles.input}
                    onFocus={() => this.onFocus()}
                    value={this.state.inputValue}
                    keyboardType='numeric'
                    underlineColorAndroid='transparent'
                />

                <KeyboardTextInputPrompt
                    inputValue={this.state.inputValue}
                    keyboardType='numeric'
                    onClose={this.onClose}
                    visible={this.state.visibleInputPrompt}
                    placeholder={this.state.placeholder}
                    onEndEditing={this.onEndEditing}
                    underlineColorAndroid='transparent'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 50,
        backgroundColor: 'skyblue',
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        marginTop: 15,
    }
})
