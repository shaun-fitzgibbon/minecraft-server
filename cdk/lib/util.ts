import { Port } from 'aws-cdk-lib/aws-ec2';
import { Protocol } from 'aws-cdk-lib/aws-ecs';
import { execa } from 'execa';
import { constants } from './constants';
import { MinecraftEditionConfig, StackConfig } from './types';

export const stringAsBoolean = (str?: string): boolean =>
  Boolean(str === 'true');

export const isDockerInstalled = (): boolean => {
  try {
    execa('docker', ['version']);
    return true;
  } catch (e) {
    return false;
  }
};

export const getMinecraftServerConfig = (
  edition: StackConfig['minecraftEdition']
): MinecraftEditionConfig => {
  const javaConfig = {
    image: constants.JAVA_EDITION_DOCKER_IMAGE,
    port: 25565,
    protocol: Protocol.TCP,
    ingressRulePort: Port.tcp(25565),
    ingressRulePortRCON: Port.tcp(25575),
  };

  const bedrockConfig = {
    image: constants.BEDROCK_EDITION_DOCKER_IMAGE,
    port: 19132,
    protocol: Protocol.UDP,
    ingressRulePort: Port.udp(19132),
    ingressRulePortRCON: Port.tcp(25575),
  };

  return edition === 'java' ? javaConfig : bedrockConfig;
};
