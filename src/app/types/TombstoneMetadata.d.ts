/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Metadata contains information on why, when and by whom a digital object was tombstoned
 */
export interface TombstoneMetadata {
  /**
   * The type of the record, in this case a ods:Tombstone
   */
  "@type": "ods:Tombstone";
  /**
   * Timestamp the Digital Object was tombstoned and no longer active.
   */
  "ods:tombstoneDate": string;
  /**
   * A reason why the Digital Object was tombstoned
   */
  "ods:tombstoneText": string;
  "ods:TombstonedByAgent": Agent;
  /**
   * The PIDs of the object the tombstoned object is related to
   */
  "ods:hasRelatedPID"?: {
    /**
     * The PID of the related object
     */
    "ods:ID"?: string;
    /**
     * The type of relationship between the tombstoned object and the related object
     */
    "ods:relationshipType"?: string;
    [k: string]: unknown;
  }[];
}
/**
 * The agent who tombstoned the object, contains an ods:Agent object
 */
export interface Agent {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o createUpdateTombstoneEvent
   */
  "@type": "schema:Person" | "schema:Organisation" | "as:Application" | "prov:Person" | "prov:SoftwareAgent";
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Indicates the role of the agent, https://schema.org/roleName
   */
  "schema:roleName"?: string;
  /**
   * Date the agent began the role
   */
  "schema:startDate"?: string;
  /**
   * Date the agent ended the role
   */
  "schema:endDate"?: string;
  /**
   * Order of the agent in the role. Can be used to indicate the order of importance
   */
  "ods:roleOrder"?: number;
  /**
   * Email of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:email"?: string;
  /**
   * URL of the agent, can be present in case the agent is a maintainer of a MAS
   */
  "schema:url"?: string;
  /**
   * Contains zero or more ods:Identifier objects
   */
  "ods:hasIdentifier"?: Identifier[];
}
/**
 * Based on https://rs.gbif.org/extension/gbif/1.0/identifier.xml but includes ods specific terms
 */
export interface Identifier {
  /**
   * The identifier for the Identifier object.
   */
  "@id"?: string;
  /**
   * The type of the digital object, in this case a ods:Identifier
   */
  "@type": "ods:Identifier";
  /**
   * The type of the identifier, https://purl.org/dc/elements/1.1/title
   */
  "dcterms:title": string;
  /**
   * The local title of the identifier
   */
  "ods:localTitle"?: string;
  /**
   * The value for the identifier, https://purl.org/dc/terms/identifier
   */
  "dcterms:identifier": string;
  /**
   * Mime type of content returned by identifier in case the identifier is resolvable. https://purl.org/dc/terms/format
   */
  "dcterms:format"?: string;
  /**
   * Keywords qualifying the identifier https://purl.org/dc/terms/subject
   */
  "dcterms:subject"?: string;
  /**
   * Indicates whether the identifier is part of the physical label
   */
  "ods:isPartOfLabel"?: boolean;
  /**
   * Indicates whether the identifier is part of the barcode or nfc chip
   */
  "ods:isBarcodeOrNFC"?: boolean;
  /**
   * Indicates whether the identifier is a persistent identifier
   */
  "ods:isIDPersistent"?: boolean;
}