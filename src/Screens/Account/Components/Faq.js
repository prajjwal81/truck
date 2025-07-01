import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import Cairo, {CairoSemiBold} from '../../../utils/fonts';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useState} from 'react';

const data = [
  {
    heading: ' 1.  What services does itruck provide?',
    content:
      'The itruck application offers 24/7 online booking access to a reliable network of carriers. It also enables users to ship, load, manage, and track various types of trucks, including flatbed, curtain-sided, and jumbo, along with several exclusive features to streamline your transportation needs.',
  },
  {
    heading: ' 2. What areas does itruck cover?',
    content:
      'Our logistics services cover all regions across the Kingdom of Saudi Arabia through a reliable network of carriers.',
  },
  {
    heading: ' 3. What paper work do I need to register as a carrier??',
    content: `To register as a carrier with itruck's Logistics Freight Solutions, you'll need your company name, commercial registration number, VAT certificate, company email, and contact number.`,
  },
  {
    heading: ' 4. What paper work do I need to register as a shipper?',
    content:
      'To register as a shipper on our digital freight platform, please provide your company name, commercial registration number, VAT certificate, company email, and contact number.',
  },
  {
    heading: ' 5. As a carrier, how will itruck pay my financial dues? ',
    content:
      'You can easily collect transportation fees immediately after submitting the delivery note.',
  },
  {
    heading: ' 6. How will itruck invoice me as a shipper?',
    content:
      'itruck sends delivery notes directly to the designated financial department for invoicing.',
  },
  {
    heading: ' 7. Can I truck my truck as a carrier?',
    content: 'Yes, you can trace the full route of your truck in real-time.',
  },
  {
    heading: ' 8. Can I truck my shipment as a shipper?',
    content:
      'Yes, you can always track the status of your shipments in real-time through the platform.',
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, paddingTop: '15%', backgroundColor: '#fff'}}>
        <Image
          source={require('../../../../assets/Images/Png/logoA.png')}
          style={{alignSelf: 'flex-end', right: '5%', width: 50, height: 50}}
        />
        <View style={styles.container}>
          <Text style={styles.preHeading}>FAQ's</Text>
          <View style={styles.redline} />
          {data.map((item, idx) => (
            <View style={styles.headerContainer} key={idx}>
              <Collapse
                isExpanded={activeIndex === idx}
                onToggle={() => handleToggle(idx)}>
                <CollapseHeader>
                  <View style={styles.innerHeaderContainer}>
                    <View style={{width: '91%'}}>
                      <Text
                        style={[
                          styles.headingTxtStyle,
                          {color: activeIndex === idx ? '#EC1E27' : 'black'},
                        ]}>
                        {item.heading}
                      </Text>
                    </View>
                    <View style={{width: '5%', left: '3%'}}>
                      <Icon
                        name={activeIndex === idx ? 'angle-up' : 'angle-down'}
                        size={18}
                        color="black"
                      />
                    </View>
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <View style={[styles.innerHeaderContainer, {width: '90%'}]}>
                    <Text style={styles.textStyle}>{item.content}</Text>
                  </View>
                </CollapseBody>
              </Collapse>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default Faq;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomColor: 'white',
    // flex: 1,
  },
  preHeading: {
    color: '#000',
    fontFamily: CairoSemiBold,
    fontSize: 28,
    fontStyle: 'normal',
    lineHeight: 37,
    marginBottom: '1%',
    textAlign: 'center',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.3,
    marginTop: 10,
    borderRadius: 10,
  },
  innerHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  textStyle: {
    fontFamily: Cairo,
    fontSize: 14,
    fontStyle: 'normal',
  },
  headingTxtStyle: {
    color: '#F38120',
    fontSize: 14,
    fontFamily: Cairo,
  },
  redline: {
    height: 2,
    backgroundColor: '#EC1E27',
    width: '30%',
    alignSelf: 'center',
    marginBottom: '7%',
    borderRadius: 10,
  },
});
