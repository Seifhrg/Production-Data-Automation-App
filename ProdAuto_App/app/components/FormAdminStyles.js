import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#555555',
    paddingBottom: 5,
    marginLeft: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: Platform.OS === 'ios' ? 180 : 50,
  },
  errorText: {
    fontSize: 14,
    color: '#D32F2F', 
    paddingHorizontal: 5,
    paddingTop: 2,
    paddingBottom: 10,
    marginBottom:10 
  }
});

export default styles;
