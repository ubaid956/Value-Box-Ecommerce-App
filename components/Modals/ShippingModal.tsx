import React from 'react';
import { Modal, View, Text, ScrollView, TextInput, KeyboardAvoidingView, Platform, Dimensions,StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import CustomButton from '../Buttons/CustomButton'; // Import your custom button
import ModalHeader from '../ModalHeader';

import { globalStyles } from '@/Styles/globalStyles';

const { height } = Dimensions.get('window');

const ShippingAddressModal = ({ visible, toggleModal, addressSchema, onSave }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggleModal}
    >
      <ModalHeader
        headerText="Adding Shipping Address"
        toggleModal={toggleModal}
      />
      <ScrollView style={styles.main}>
        <KeyboardAvoidingView
          style={styles.main}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150} // Adjust offset if needed
        >
          <View style={[styles.main, { marginTop: height * 0.2 }]}>
            <View
              style={[
                globalStyles.inputField,
                { marginBottom: height * 0.02 },
              ]}
            >
              <Text style={{ fontSize: 10, position: "absolute", left: 15 }}>
                Country/Region
              </Text>
              <Picker style={styles.picker}>
                <Picker.Item label="Pakistan" value="Pakistan" />
              </Picker>
            </View>
            <Formik
              initialValues={{
                name: "",
                address: "",
                phone: "",
              }}
              validationSchema={addressSchema}
              onSubmit={(values) => {
                onSave(values);
                toggleModal();
              }}
            >
              {(props) => (
                <View>
                  <Text style={globalStyles.label}>
                    Name <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <TextInput
                    placeholder="Name"
                    style={[globalStyles.inputField, { paddingLeft: 15 }]}
                    value={props.values.name}
                    onChangeText={props.handleChange("name")}
                    onBlur={props.handleBlur("name")}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.name && props.errors.name}
                  </Text>
                  <Text style={globalStyles.label}>
                    Address<Text style={{ color: "red" }}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Address"
                    style={[globalStyles.inputField, { paddingLeft: 15 }]}
                    value={props.values.address}
                    onChangeText={props.handleChange("address")}
                    onBlur={props.handleBlur("address")}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.address && props.errors.address}
                  </Text>
                  <Text style={globalStyles.label}>
                    Phone<Text style={{ color: "red" }}> *</Text>
                  </Text>
                  <TextInput
                    placeholder="Phone"
                    style={[globalStyles.inputField, { paddingLeft: 15 }]}
                    value={props.values.phone}
                    keyboardType="numeric"
                    onChangeText={props.handleChange("phone")}
                    onBlur={props.handleBlur("phone")}
                  />
                  <Text style={globalStyles.errorText}>
                    {props.touched.phone && props.errors.phone}
                  </Text>
                  <CustomButton title="Save" onPress={props.handleSubmit} />
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
};


const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column",
        height: height,
        backgroundColor: "#ffffff",
      },
})
export default ShippingAddressModal;
