import { View, Text, Divider, Spacer, Stack, Icon, Button } from 'core';

import Field from '../../../shared/components/field';
import Person from '../../../shared/components/person';

import styles from '../../../App.module.scss';

const Requirement = ({ title, createdDate, updatedDate, storyId, selected }: any) => {
  return (
    <View horizontal padding="small" fillColor={selected && 'blue-0'}>
      <Icon icon="clipboard-list" color="violet-4" style={{ marginTop: -2 }} />
      <Spacer size="xsmall" />
      <View>
        <Text>{title}</Text>
        <Spacer size="small" />
        <View horizontal>
          <Text light fontSize="small">Created {createdDate}</Text>
          {createdDate && updatedDate && (
            <Text fontSize="small">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</Text>
          )}
          {updatedDate && (
            <Text light fontSize="small">Updated {updatedDate}</Text>
          )}
          {updatedDate && storyId && (
            <Text fontSize="small">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</Text>
          )}
          {storyId && (
            <Text fontSize="small" textColor="blue-6">Story GEM-1324</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const epicDescription = `Document changes made to Quote from a carrier’s response to our rate request, items to capture from response such as messaging, premium, URL link to carrier portal, etc.\\n\\n
Current Implementations:\\n\\n
https://bitbucket.insureondev.com/ projects/ATOM/repos/ chubbrater/browse/Ion.ChubbRaterGL.Server/Rater.cs
https://bitbucket.insureondev.com/ projects/ATOM/repos/ chubbrater/browse/Ion.ChubbRaterBOP.Server/Rater.cs
https://bitbucket.insureondev.com/ projects/ATOM/repos/ chubbrater/browse/Ion.ChubbRaterWC.Server/Rater.cs`;

const requirementDescription = `As the Quote Product Owner, I need Chubb WC rater mapping files cleaned up in preparation for ADP's move to the V2 version of the application.

Reference: https://bitbucket.insureondev.com/projects/
ATOM/repos/chubbrater/browse/Ion.ChubbRaterWC.Server/Mappers

Issue:

After review with Development lead, it appears we have multiple files in the Chubb WC Mapper that can lead to confusion.  After review with Chubb on the functionality available around UW Questions (see User interaction and design below), it appears the Question Codes differ between what is acceptable in the Digital quote request vs. the ADP quote request.  

Reviewed Example PROD Clients to verify which QuestionCds are being used:

ADP PROD ClientID 1874626 - successfully received premium, verified question codes being passed are the MP QuestionCd (Marketplace)

ION PROD ClientID 12499471 - successfully received premium, no MP Questions passed and response confirmed it was quoted in Digital product

Requirements:

    Review Mapper files and archive/eliminate files that are out of use currently
    Disable UW Question Service for ADP - this service is only valid for the ION Digital WC Request
    Remove RMS for ADP and use existing mapping`;

const EpicsPage = () => {
  return (
    <Stack flex horizontal divider className={styles.epicsPage}>

      <View flex fillColor="gray-1" className={styles.epicsPanel} style={{ flex: '0.25', scrollSnapAlign: 'start' }}>
        <View padding="small medium" fillColor="gray-0">
          <Spacer size="small" />
          <Text fontSize="large">Epic Stories</Text>
        </View>
        <Divider />
        <View padding="medium">
          <Stack divider style={{ border: '1px solid #dee2e6', borderRadius: 4, overflow: 'hidden' }}>
            <View padding="small medium" fillColor="blue-0">
              <Text>Chubb Rate Quote Response Mapping</Text>
            </View>
            <View padding="small medium" fillColor="white">
              <Text>Edit stories and epics</Text>
            </View>
          </Stack>
        </View>
      </View>

      <Stack flex horizontal divider className={styles.epicDetailsPanel} style={{ scrollSnapAlign: 'start', overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
        <View flex className={styles.epicDetails} style={{ scrollSnapAlign: 'start' }}>
          <View padding="small medium" fillColor="gray-0">
            <Spacer size="small" />
            <Text light caps fontSize="small">Epic Story</Text>
            <Spacer size="small" />
            <Text fontSize="large">Chubb Rate Quote Response Mapping</Text>
            <Spacer size="large" />
            <Stack horizontal>
              <Field label="Budget" initialValue="One month" />
              <Spacer size="large" />
              <Field label="Initiative" initialValue="Increase sales" />
            </Stack>
            <Spacer size="large" />
            <Stack horizontal spacing="medium">
              <Text fontSize="medium">Details</Text>
              <Text fontSize="medium">Questions</Text>
            </Stack>
          </View>
          <Divider />
          <Stack padding="medium" spacing="large">
            <Field label="Description" initialValue={epicDescription} />
            <View>
              <Text light caps fontSize="small">Requirements</Text>
              <Spacer size="small" />
              <Divider />
              <Stack divider>
                <Requirement selected title="Info Alert response mapping for new field in Chubb WC rater" createdDate="Feb 16, 2023" updatedDate="Feb 20, 2023" storyId={1} />
                <Requirement title="Quote Proposal PDF stored for Chubb WC rater" createdDate="Feb 16, 2023" updatedDate="Feb 20, 2023" />
                <Requirement title="Ratability Reasons file consolidated to one for Chubb GL, BOP, WC rater" createdDate="Feb 16, 2023" />
              </Stack>
              <Divider />
            </View>
            <View>
              <Text light caps fontSize="small">Assignees</Text>
              <Spacer size="small" />
              <View horizontal style={{ gap: 8, flexWrap: 'wrap' }}>
                <Person name="Patricia Jackson" tags="ux, figma, zeplin" />
                <Person name="Elizabeth Ohara" tags="product" />
                <Person name="Mark Seaton" tags="quality, selenium" />
                <View hovered="a" fillColor="gray-1" align="center" style={{ width: 40, borderRadius: 1000, cursor: 'pointer' }}>
                  <Icon icon="plus" />
                </View>
              </View>
            </View>
          </Stack>
        </View>

        <View flex className={styles.requirementDetails} style={{ scrollSnapAlign: 'start' }}>
          <View padding="small medium" fillColor="gray-0">
            <Spacer size="small" />
            <Text light caps fontSize="small">Requirement</Text>
            <Spacer size="small" />
            <Text fontSize="large">Info Alert response mapping for new field in Chubb WC rater</Text>
            <Spacer size="large" />
            <View horizontal>
              <Field label="Priority" initialValue="Must Have" />
              <Spacer size="large" />
              <Field label="Tags" initialValue="infrastructure" />
              <Spacer flex size="small" />
              <Button primary size="small" title="Create User Story" />
            </View>
          </View>
          <Divider />
          <View padding="medium">
            <Text style={{ whiteSpace: 'pre-wrap' }}>{requirementDescription}</Text>
          </View>
        </View>
      </Stack>

    </Stack>
  );
};

export default EpicsPage;
