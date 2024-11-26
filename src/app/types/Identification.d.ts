/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Identification {
  /**
   * The identifier for the Identification object.
   */
  "@id"?: string;
  /**
   * The type of the digital object, in this case a ods:Identification
   */
  "@type": "ods:Identification";
  /**
   * https://rs.tdwg.org/dwc/terms/identificationID
   */
  "dwc:identificationID"?: string;
  /**
   * Indicates the type of identification. At the moment only ods:TaxonIdentification is supports. Expected to be extend with identification types for Geological or Mineral Identifications
   */
  "ods:identificationType"?: "TaxonIdentification";
  /**
   * A string representing the identification as it appeared in the original record
   */
  "dwc:verbatimIdentification"?: string;
  /**
   * A list (concatenated and separated) of nomenclatural types (type status, typified scientific name, publication) applied to the subject
   */
  "dwc:typeStatus"?: string;
  /**
   * The date on which the subject was determined
   */
  "dwc:dateIdentified"?: string;
  /**
   * If this is the accepted identification, based on https://rs.tdwg.org/dwc/terms/identificationVerificationStatus
   */
  "ods:isVerifiedIdentification": boolean;
  /**
   * Comments or notes about the ods:Identification
   */
  "dwc:identificationRemarks"?: string;
  /**
   * A brief phrase or a standard term ("cf.", "aff.") to express the determiner's doubts about the dwc:Identification
   */
  "dwc:identificationQualifier"?: string;
  /**
   * The agent(s) involved in the identification, uses `ods:Agent`
   */
  "ods:hasAgents"?: Agent[];
  /**
   * Any citations associated with the identification
   */
  "ods:hasCitations"?: Citation[];
  /**
   * Contains the Taxonomic Identifications of the object
   */
  "ods:hasTaxonIdentifications"?: TaxonIdentification[];
}
export interface Agent {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o ods:CreateUpdateTombstoneEvent
   */
  "@type":
    | "schema:Person"
    | "schema:Organization"
    | "schema:SoftwareApplication"
    | "prov:Person"
    | "prov:SoftwareAgent";
  /**
   * The primary unique identifier of the Agent object. All identifiers will also be added to the ods:hasIdentifiers array
   */
  "schema:identifier"?: string;
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Contains all roles associated with the agent in the context of the Digital Object. Should always contain at least one role
   *
   * @minItems 1
   */
  "ods:hasRoles"?: [
    {
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    },
    ...{
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    }[]
  ];
  /**
   * Email of the agent
   */
  "schema:email"?: string;
  /**
   * URL to a website of the agent
   */
  "schema:url"?: string;
  /**
   * Contains all identifiers associated with the agent
   */
  "ods:hasIdentifiers"?: Identifier[];
}
/**
 * Object used to describe identifiers of a Digital Object, based on https://rs.gbif.org/extension/gbif/1.0/identifier.xml but includes ods specific terms
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
   * A name for the identifier
   */
  "dcterms:title": string;
  /**
   * The type of the value in the `dcterms:identifier` field
   */
  "dcterms:type"?:
    | "ARK"
    | "arXiv"
    | "bibcode"
    | "DOI"
    | "EAN13"
    | "EISSN"
    | "Handle"
    | "IGSN"
    | "ISBN"
    | "ISSN"
    | "ISTC"
    | "LISSN"
    | "LSID"
    | "PMID"
    | "PURL"
    | "UPC"
    | "URL"
    | "URN"
    | "w3id"
    | "UUID"
    | "Other"
    | "Locally unique identifier";
  /**
   * The value for the identifier
   */
  "dcterms:identifier": string;
  /**
   * All possible mime types of content that can be returned by identifier in case the identifier is resolvable. Plain UUIDs for example do not have a dc:format return type, as they are not resolvable on their own. For a list of MIME types see the list maintained by IANA: http://www.iana.org/assignments/media-types/index.html, in particular the text http://www.iana.org/assignments/media-types/text/ and application http://www.iana.org/assignments/media-types/application/ types. Frequently used values are text/html, text/xml, application/rdf+xml, application/json
   */
  "dcterms:format"?: string[];
  /**
   * Additional keywords that the publisher may prefer to be attached to the identifier
   */
  "dcterms:subject"?: string[];
  /**
   * Indicates whether the identifier is part of the physical label
   */
  "ods:isPartOfLabel"?: boolean;
  /**
   * Indicates whether the identifier is a persistent identifier
   */
  "ods:gupriLevel"?:
    | "LocallyUniqueStable"
    | "GloballyUniqueStable"
    | "GloballyUniqueStableResolvable"
    | "GloballyUniqueStablePersistentResolvable"
    | "GloballyUniqueStablePersistentResolvableFDOCompliant";
  /**
   * Indicates the status of the identifier
   */
  "ods:identifierStatus"?: "Preferred" | "Alternative" | "Superseded";
}
/**
 * Based on https://rs.gbif.org/extension/gbif/1.0/references.xml but includes ods specific terms
 */
export interface Citation {
  /**
   * The main identifier of the citation, preferably a DOI, ISBN, URI, etc referring to the reference
   */
  "@id"?: string;
  /**
   * The type of the digital object, in this case a ods:Citation
   */
  "@type": "ods:Citation";
  /**
   * The main identifier of the citation, preferably a DOI, ISBN, URI, etc referring to the reference
   */
  "dcterms:identifier"?: string;
  /**
   * The category that best matches the nature of a reference
   */
  "dcterms:type"?: string;
  /**
   * Date of publication
   */
  "dcterms:date"?: string;
  /**
   * Title of publication
   */
  "dcterms:title"?: string;
  /**
   * Page number of the citation
   */
  "ods:pageNumber"?: string;
  /**
   * Abstracts, remarks, notes
   */
  "dcterms:description"?: string;
  /**
   * A bibliographic reference for the resource
   */
  "dcterms:bibliographicCitation": string;
  /**
   * Is the citation peer reviewed?
   */
  "ods:isPeerReviewed"?: boolean;
  /**
   * The agent(s) who made the publication, contains an ods:Agent object
   */
  "ods:hasAgents"?: Agent1[];
}
export interface Agent1 {
  /**
   * The identifier for the Agent object
   */
  "@id"?: string;
  /**
   * The type of the agent, the prov ontology is only used in the prov-o ods:CreateUpdateTombstoneEvent
   */
  "@type":
    | "schema:Person"
    | "schema:Organization"
    | "schema:SoftwareApplication"
    | "prov:Person"
    | "prov:SoftwareAgent";
  /**
   * The primary unique identifier of the Agent object. All identifiers will also be added to the ods:hasIdentifiers array
   */
  "schema:identifier"?: string;
  /**
   * Full name of the agent
   */
  "schema:name"?: string;
  /**
   * Contains all roles associated with the agent in the context of the Digital Object. Should always contain at least one role
   *
   * @minItems 1
   */
  "ods:hasRoles"?: [
    {
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    },
    ...{
      /**
       * The identifier for the agent role, preferably a URL to a controlled vocabulary
       */
      "@id"?: string;
      /**
       * The type of the object, in this case schema:Role
       */
      "@type": "schema:Role";
      /**
       * The category that best matches the nature of a role of an Agent
       */
      "schema:roleName": string;
      /**
       * Date the agent began the role
       */
      "schema:startDate"?: string;
      /**
       * Date the agent ended the role
       */
      "schema:endDate"?: string;
      /**
       * Can be used to indicate the order of importance when there are multiple agents with the same role. Lower order means higher importance.
       */
      "schema:position"?: number;
    }[]
  ];
  /**
   * Email of the agent
   */
  "schema:email"?: string;
  /**
   * URL to a website of the agent
   */
  "schema:url"?: string;
  /**
   * Contains all identifiers associated with the agent
   */
  "ods:hasIdentifiers"?: Identifier[];
}
export interface TaxonIdentification {
  /**
   * The identifier for the Taxon Identification object.
   */
  "@id"?: string;
  /**
   * The type of the digital object, in this case a ods:TaxonIdentification
   */
  "@type": "ods:TaxonIdentification";
  /**
   * An identifier for the set of dwc:Taxon information. May be a global unique identifier or an identifier specific to the data set
   */
  "dwc:taxonID"?: string;
  /**
   * The full scientific name, with authorship and date information if known. This should be the name in lowest level taxonomic rank that can be determined. This term should not contain identification qualifications, which should instead be supplied in the dwc:identificationQualifier term
   */
  "dwc:scientificName": string;
  /**
   * An identifier for the nomenclatural (not taxonomic) details of a scientific name
   */
  "dwc:scientificNameID"?: string;
  /**
   * A Hyper Text Markup Language (HTML) representation of the scientific name. Includes correct formatting of the name.
   */
  "ods:scientificNameHTMLLabel"?: string;
  /**
   * A Hyper Text Markup Language (HTML) representation of the genus name. Includes correct formatting of the name.
   */
  "ods:genusHTMLLabel"?: string;
  /**
   * The authorship information for the dwc:scientificName formatted according to the conventions of the applicable dwc:nomenclaturalCode
   */
  "dwc:scientificNameAuthorship"?: string;
  /**
   * The four-digit year in which the dwc:scientificName was published
   */
  "dwc:namePublishedInYear"?: string;
  /**
   * The taxonomic rank of the most specific name in the dwc:scientificName
   */
  "dwc:taxonRank"?: string;
  /**
   * The taxonomic rank of the most specific name in the dwc:scientificName as it appears in the original record
   */
  "dwc:verbatimTaxonRank"?: string;
  /**
   * Comments or notes about the taxon or name
   */
  "dwc:taxonRemarks"?: string;
  /**
   * The full scientific name of the kingdom in which the ods:TaxonIdentification is classified
   */
  "dwc:kingdom"?: string;
  /**
   * The full scientific name of the phylum or division in which the ods:TaxonIdentification is classified
   */
  "dwc:phylum"?: string;
  /**
   * The full scientific name of the class in which the ods:TaxonIdentification is classified
   */
  "dwc:class"?: string;
  /**
   * The full scientific name of the order in which the ods:TaxonIdentification is classified
   */
  "dwc:order"?: string;
  /**
   * The full scientific name of the family in which the ods:TaxonIdentification is classified
   */
  "dwc:family"?: string;
  /**
   * The full scientific name of the subfamily in which the ods:TaxonIdentification is classified
   */
  "dwc:subfamily"?: string;
  /**
   * The full scientific name of the genus in which the ods:TaxonIdentification is classified
   */
  "dwc:genus"?: string;
  /**
   * The name of the first or species epithet of the dwc:scientificName
   */
  "dwc:specificEpithet"?: string;
  /**
   * The status of the use of the dwc:scientificName as a label for a taxon. Requires taxonomic opinion to define the scope of a ods:TaxonIdentification. Rules of priority then are used to define the taxonomic status of the nomenclature contained in that scope, combined with the experts opinion. It must be linked to a specific taxonomic reference that defines the concept
   */
  "dwc:taxonomicStatus"?: string;
  /**
   * The nomenclatural code (or codes in the case of an ambiregnal name) under which the dwc:scientificName is constructed
   */
  "dwc:nomenclaturalCode"?: string;
  /**
   * A common or vernacular name
   */
  "dwc:vernacularName"?: string;
  /**
   * The full scientific name of the subgenus in which the ods:TaxonIdentification is classified. Values should include the genus to avoid homonym confusion
   */
  "dwc:subgenus"?: string;
  /**
   * The full name, with authorship and date information if known, of the currently valid (zoological) or accepted (botanical) ods:TaxonIdentification
   */
  "dwc:acceptedNameUsage"?: string;
  /**
   * An identifier for the name usage (documented meaning of the name according to a source) of the currently valid (zoological) or accepted (botanical) taxon
   */
  "dwc:acceptedNameUsageID"?: string;
  /**
   * Part of the name of a cultivar, cultivar group or grex that follows the dwc:scientificName
   */
  "dwc:cultivarEpithet"?: string;
  /**
   * The genus part of the dwc:scientificName without authorship
   */
  "dwc:genericName"?: string;
  /**
   * The infrageneric part of a binomial name at ranks above species but below genus
   */
  "dwc:infragenericEpithet"?: string;
  /**
   * The name of the lowest or terminal infraspecific epithet of the dwc:scientificName, excluding any rank designation
   */
  "dwc:infraspecificEpithet"?: string;
  /**
   * The status related to the original publication of the name and its conformance to the relevant rules of nomenclature. It is based essentially on an algorithm according to the business rules of the code. It requires no taxonomic opinion
   */
  "dwc:nomenclaturalStatus"?: string;
  /**
   * The taxon name, with authorship and date information if known, as it originally appeared when first established under the rules of the associated dwc:nomenclaturalCode. The basionym (botany) or basonym (bacteriology) of the dwc:scientificName or the senior/earlier homonym for replaced names
   */
  "dwc:originalNameUsage"?: string;
  /**
   * The full scientific name of the subtribe in which the ods:TaxonIdentification is classified
   */
  "dwc:subtribe"?: string;
  /**
   * The full scientific name of the superfamily in which the ods:TaxonIdentification is classified
   */
  "dwc:superfamily"?: string;
  /**
   * The full scientific name of the tribe in which the ods:TaxonIdentification is classified
   */
  "dwc:tribe"?: string;
}
