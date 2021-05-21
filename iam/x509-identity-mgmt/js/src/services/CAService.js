/**
 * Service to handle Root CA
 */
class CAService {
  /**
   * The dependencies are injected through the constructor
   */
  constructor({
    ejbcaFacade, rootCA, pkiUtils,
  }) {
    Object.defineProperty(this, 'ejbcaFacade', { value: ejbcaFacade });
    Object.defineProperty(this, 'rootCA', { value: rootCA });
    Object.defineProperty(this, 'pkiUtils', { value: pkiUtils });
  }

  /**
   * Obtains the Root certificate used to sign all certificates generated by this component.
   *
   * @returns the root CA certificate.
   */
  async getRootCertificate() {
    const caPem = await this.ejbcaFacade.getRootCertificate(this.rootCA);

    const certificateFingerprint = this.pkiUtils.getFingerprint(caPem);

    return { certificateFingerprint, caPem };
  }

  /**
   * Get the latest valid certificate revocation list.
   *
   * @param {boolean} renew Flag indicating whether a new CRL should
   *                        be generated in the EJBCA request
   *
   * @returns the latest valid CRL.
   */
  async getRootCRL(renew = false) {
    const crl = await this.ejbcaFacade.getCRL(this.rootCA, renew);
    return { crl };
  }
}

module.exports = CAService;