import { Alert, Modal, StyleSheet,Text, TouchableOpacity, View } from 'react-native'
import { COLORS, WINDOW } from '../constants/theme';
import NetworkImage from './NetworkImage';

export  enum ConfirmationType{
    confirm= 'CONFIRM',
    confirmCancel= 'CONFIRM_CANCEL',
    close= 'CLOSE',
};

export  enum ModalType{
    error= 1,
    warning= 2,
    success= 3,
};

type CustomModalProps= {
    isModalVisible: boolean,
    setIsModalVisible: any,
    handlerConfirm?: any,
    modalType?: ModalType,
    title : string
    content?: string;
    confirmationType?: ConfirmationType;
  };

export default function CustomModal({isModalVisible, setIsModalVisible, handlerConfirm,modalType, title, content, confirmationType}: CustomModalProps) {


    const getImage = (param? : ModalType) =>{

        switch(param){
            case ModalType.error: return "https://www.freeiconspng.com/uploads/sign-red-error-icon-1.png";
            case ModalType.warning: return "https://cdn-icons-png.flaticon.com/512/9847/9847984.png";
            case ModalType.error: return "https://pluspng.com/img-png/success-png-success-icon-image-23201-512.png";
            default: return "https://icon-library.com/images/maintain-icon/maintain-icon-11.jpg";
        }
    }

    return (
        <View>

            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={styles.centerView}>

                    <View style={styles.contentView}>

                        <NetworkImage data={getImage(modalType)} height={250} width={250} radius={15} />

                        <Text style={styles.title}>{title}</Text>

                        <Text style={styles.subTitle}>{content}</Text>

                        
                    </View>

                    {
                        (confirmationType === ConfirmationType.confirmCancel)?
                            (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                            <TouchableOpacity style={styles.layoutBtn} onPress={ () => {handlerConfirm(); setIsModalVisible(false);}}>
                                <Text style={styles.txtBnt}> Confirm </Text>
                            </TouchableOpacity>
    
                            <TouchableOpacity style={styles.layoutBtn} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.txtBnt}> Cancel </Text>
                            </TouchableOpacity>
    
                            </View> 
                            ) : null
                    }

                    {
                        (confirmationType === ConfirmationType.close)?
                            (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                                <TouchableOpacity style={styles.layoutBtn} onPress={ ()=>{ setIsModalVisible(false)}}>
                                    <Text style={styles.txtBnt}> Close </Text>
                                </TouchableOpacity>
    
                            </View> 
                            ) : null
                    }
                   
                   {
                        (confirmationType === ConfirmationType.confirm)?
                            (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                                <TouchableOpacity style={styles.layoutBtn} onPress={ () => {handlerConfirm(); setIsModalVisible(false);}}>
                                    <Text style={styles.txtBnt}> Confirm </Text>
                                </TouchableOpacity>
    
                            </View> 
                            ) : null
                    }



                </View>
            </Modal>


        </View>
    )

}
const styles = StyleSheet.create({
      centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: COLORS.offwhite,
        borderWidth: 5,
        marginHorizontal:10,
        marginVertical:30,
        borderRadius: 12,
        backgroundColor:  COLORS.lightWhite
      },
      contentView: { 
        marginBottom: 20,
      },
      title:{
        textAlign: 'center',
        fontFamily: "bold",
        fontSize: 20,
        marginVertical:10
      },
      subTitle:{
        fontSize: 18,
        fontFamily: 'medium',
        color: COLORS.gray,
        marginHorizontal: 5
      },
      layoutBtn: {
        marginVertical: 20,
        marginHorizontal: 10,
        fontFamily: "bold",
        fontSize: 35,
        color: COLORS.white,
        backgroundColor:  COLORS.primary,
        borderRadius:30
       },
      txtBnt: {
        marginVertical:5,
        marginHorizontal: 30,
        fontFamily: "bold",
        fontSize: 20,
        textAlign:"center",
        color: COLORS.white,
      },
    
});
  