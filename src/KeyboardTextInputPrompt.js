import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    DeviceEventEmitter,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import PropsType from 'prop-types';

export default class KeyboardTextInputPrompt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            intputValue: '',
            focused: false,
        }
    }


    componentWillReceiveProps (nextProps) {
        if (nextProps.visible) {
            this.registerKeyboardEvent();
        }

        let inputValue = nextProps.inputValue;
        this.setState({inputValue: inputValue});
    }

    registerKeyboardEvent = () => {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    unregisterKeyboardEvent = () => {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    _keyboardDidShow = (e) => {
    }

    _keyboardDidHide = (e) => {
        this.onEndEditing();
    }

    onFocus = () => {
        this.setState({focused: true});
    }

    onEndEditing = () => {
        this.props.onEndEditing(this.state.inputValue);
        this.props.onClose();

        this.setState({focused: false})

        this.unregisterKeyboardEvent();

        Keyboard.dismiss();
    }

    onChangeText = (text) => {
        this.setState({
            inputValue: text,
        })
    }

    handleTouchOnSpace = () => {
        this.onEndEditing();
    }

    render() {	
        if (this.props.visible && !this.state.focused) {
            Keyboard.dismiss();
        }

        return (
            <Modal 
                onRequestClose={() => {this.props.onClose()}}
                visible={this.props.visible}
                transparent={true}
                animationType='slide'
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={this.handleTouchOnSpace}
                    >
                        <View style={{flex: 1}} />
                    </TouchableWithoutFeedback>
                    
                    <View>
                        <TextInput
                            placeholder={this.props.placeholder}
                            style={[styles.input, this.props.inputStyle]}
                            onFocus={this.onFocus}
                            value={this.state.inputValue}
                            keyboardType={this.props.keyboardType}
                            autoFocus={true}
                            onEndEditing={this.onEndEditing}
                            onChangeText={this.onChangeText}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                
                </View>
            </Modal>
        )
    }
}


KeyboardTextInputPrompt.propTypes = {
    inputValue: PropsType.string,
    keyboardType: PropsType.string,
    visible: PropsType.bool,
    onEndEditing: PropsType.func,
    onClose: PropsType.func.isRequired,
}

KeyboardTextInputPrompt.defaultProps = {
    inputValue: '',
    keyboardType: 'default',
	visible: false,
	onClose: () => null,
}

const styles = StyleSheet.create({
	dialogContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
    input: {
        height: 40,
        backgroundColor: 'white',
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#AAA',
        padding: 10
    }
});