import { View, Text, Divider, Spacer, Stack, Icon, Button } from 'core';

import Field from '../../../shared/components/field';

const Requirement = ({ title, createdDate, updatedDate, storyId }: any) => {
  return (
    <View horizontal padding="small none">
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
            <Text fontSize="small" textColor="blue-6">GEM-1324</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const EpicsPage = () => {
  return (
    <Stack flex horizontal divider>
      <View style={{ width: 320 }}>
        <View padding="small medium">
          <Spacer size="small" />
          <Text fontSize="large">Epics</Text>
        </View>

        <Divider />

        <Stack divider fillColor="gray-1" padding="medium">
          <View padding="small medium" fillColor="white">
            <Text>Chubb Rate Quote Response Mapping</Text>
          </View>
          <View padding="small medium" fillColor="white">
            <Text>Edit stories and epics</Text>
          </View>
        </Stack>
      </View>

      <View flex>
        <View padding="small medium" fillColor="gray-0">
          <Spacer size="small" />
          <Text fontSize="large">Chubb Rate Quote Response Mapping</Text>
          <Spacer size="large" />
          <Stack horizontal>
            <Field label="Budget" initialValue="One month" />
            <Spacer size="large" />
            <Field label="Initiative" initialValue="One month" />
          </Stack>
          <Spacer size="large" />
          <Text fontSize="medium">Details</Text>
        </View>
        <Divider />
        <Spacer size="small" />
        <Stack padding="medium" spacing="large">
          <Field label="Description" initialValue="Document changes made to Quote from a carrier’s response to our rate request, items to capture from response such as messaging, premium, URL link to carrier portal, etc.\n\n
Current Implementations:\n\n

https://bitbucket.insureondev.com/ projects/ATOM/repos/ chubbrater/browse/Ion.ChubbRaterGL.Server/Rater.cs

https://bitbucket.insureondev.com/ projects/ATOM/repos/ chubbrater/browse/Ion.ChubbRaterBOP.Server/Rater.cs

https://bitbucket.insureondev.com/ projects/ATOM/repos/ chubbrater/browse/Ion.ChubbRaterWC.Server/Rater.cs" />
          <View>
            <Text light caps fontSize="small">Requirements</Text>
            <Spacer size="small" />
            <Divider />
            <Stack divider>
              <Requirement title="Info Alert response mapping for new field in Chubb WC rater" createdDate="Feb 16, 2023" updatedDate="Feb 20, 2023" storyId={1} />
              <Requirement title="Quote Proposal PDF stored for Chubb WC rater" createdDate="Feb 16, 2023" updatedDate="Feb 20, 2023" />
              <Requirement title="Ratability Reasons file consolidated to one for Chubb GL, BOP, WC rater" createdDate="Feb 16, 2023" />
            </Stack>
            <Divider />
          </View>
        </Stack>
      </View>

      <View flex>
        <View padding="small medium" fillColor="gray-0">
          <Spacer size="small" />
          <Text fontSize="large">Info Alert response mapping for new field in Chubb WC rater</Text>
          <Spacer size="small" />
          <View horizontal align="bottom left">
            <Text fontSize="medium">Details</Text>
            <Spacer flex size="small" />
            <Button primary size="small" title="Create Story" />
          </View>
        </View>
        <Divider />
        <View padding="medium">
          <Text style={{ whiteSpace: 'pre-wrap' }}>{`Add Information only Quote Alert and parse response from new field data.digitalQuoteRateResponse.quoteInfo.bridgeLinkDesc in Quote Alerts

Sample:
bridgeLinkDesc_QuoteResponse_Sample (1).json
26 Oct 2022, 02:14 PM

"quoteInfo": {
  "quoteNumber": "U3549310000000",
  "quoteDescription": "CREATED FROM DIGITAL API",
  "policyUrl": "https://uat-sciagents.chubb.com/marketplace?action=DIGIQTCONV&quoteid=463780&lob=WorkersComp",
  "bridgeLinkDesc": "Use the link to carrier button to complete quote and request pricing within Marketplace for the quickest turnaround."
}`}
          </Text>

        </View>
      </View>
    </Stack>
  );
};

export default EpicsPage;
