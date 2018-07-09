#include "SoilErosion_MUSLE.h"

#include "text.h"

SERO_MUSLE::SERO_MUSLE() :
    m_nCells(-1), m_cellWth(-1.f), m_nSoilLayers(-1), m_soilRock(nullptr),
    m_depRatio(NODATA_VALUE), m_detSand(nullptr), m_detSilt(nullptr),
    m_detClay(nullptr), m_detSmAgg(nullptr), m_detLgAgg(nullptr),
    m_landCover(nullptr), m_usleP(nullptr), m_usleK(nullptr), m_usleC(nullptr),
    m_iCfac(0), m_aveAnnUsleC(nullptr), m_rsdCovSoil(nullptr),
    m_rsdCovCoef(NODATA_VALUE), m_canHgt(nullptr), m_lai(nullptr),
    m_slope(nullptr), m_slpLen(nullptr), m_flowAccm(nullptr), m_rchID(nullptr), m_usleMult(nullptr),
    m_cellAreaKM(NODATA_VALUE), m_cellAreaKM1(NODATA_VALUE), m_cellAreaKM2(NODATA_VALUE),
    m_slopeForPq(nullptr),
    m_snowAccum(nullptr), m_surfRf(nullptr),
    m_eroSed(nullptr), m_eroSand(nullptr), m_eroSilt(nullptr), m_eroClay(nullptr),
    m_eroSmAgg(nullptr), m_eroLgAgg(nullptr) {
}

SERO_MUSLE::~SERO_MUSLE() {
    if (m_eroSed != nullptr) Release1DArray(m_eroSed);
    if (m_eroSand != nullptr) Release1DArray(m_eroSand);
    if (m_eroSilt != nullptr) Release1DArray(m_eroSilt);
    if (m_eroClay != nullptr) Release1DArray(m_eroClay);
    if (m_eroSmAgg != nullptr) Release1DArray(m_eroSmAgg);
    if (m_eroLgAgg != nullptr) Release1DArray(m_eroLgAgg);
    if (m_usleMult != nullptr) Release1DArray(m_usleMult);
    if (m_slopeForPq != nullptr) Release1DArray(m_slopeForPq);
}

bool SERO_MUSLE::CheckInputData() {
    CHECK_POSITIVE(MID_SERO_MUSLE, m_nCells);
    CHECK_POSITIVE(MID_SERO_MUSLE, m_cellWth);
    CHECK_POINTER(MID_SERO_MUSLE, m_soilRock);
    CHECK_NONNEGATIVE(MID_SERO_MUSLE, m_depRatio);
    CHECK_POINTER(MID_SERO_MUSLE, m_landCover);
    CHECK_POINTER(MID_SERO_MUSLE, m_usleC);
    CHECK_NONNEGATIVE(MID_SERO_MUSLE, m_iCfac);
    if (m_iCfac == 1) {
        CHECK_NODATA(MID_SERO_MUSLE, m_rsdCovCoef);
        CHECK_POINTER(MID_SERO_MUSLE, m_canHgt);
        CHECK_POINTER(MID_SERO_MUSLE, m_lai);
    }
    CHECK_POINTER(MID_SERO_MUSLE, m_usleK);
    CHECK_POINTER(MID_SERO_MUSLE, m_usleP);
    CHECK_POINTER(MID_SERO_MUSLE, m_flowAccm);
    CHECK_POINTER(MID_SERO_MUSLE, m_slope);
    CHECK_POINTER(MID_SERO_MUSLE, m_snowAccum);
    CHECK_POINTER(MID_SERO_MUSLE, m_surfRf);
    CHECK_POINTER(MID_SERO_MUSLE, m_rchID);
    CHECK_POINTER(MID_SERO_MUSLE, m_detSand);
    CHECK_POINTER(MID_SERO_MUSLE, m_detSilt);
    CHECK_POINTER(MID_SERO_MUSLE, m_detClay);
    CHECK_POINTER(MID_SERO_MUSLE, m_detSmAgg);
    CHECK_POINTER(MID_SERO_MUSLE, m_detLgAgg);
    return true;
}

void SERO_MUSLE::InitialOutputs() {
    CHECK_POSITIVE(MID_SERO_MUSLE, m_nCells);
    if (nullptr == m_eroSed) Initialize1DArray(m_nCells, m_eroSed, 0.f);
    if (nullptr == m_eroSand) Initialize1DArray(m_nCells, m_eroSand, 0.f);
    if (nullptr == m_eroSilt) Initialize1DArray(m_nCells, m_eroSilt, 0.f);
    if (nullptr == m_eroClay) Initialize1DArray(m_nCells, m_eroClay, 0.f);
    if (nullptr == m_eroSmAgg) Initialize1DArray(m_nCells, m_eroSmAgg, 0.f);
    if (nullptr == m_eroLgAgg) Initialize1DArray(m_nCells, m_eroLgAgg, 0.f);

    if (nullptr == m_usleMult) {
        m_usleMult = new(nothrow) float[m_nCells];
        m_slopeForPq = new(nothrow) float[m_nCells];
#pragma omp parallel for
        for (int i = 0; i < m_nCells; i++) {
            // Calculate USLE slope length factor, line 286-292 of readhru.f of SWAT source.
            // Section 4:1.1.4 and 4:1.1.5 of SWAT Theory 2009.
            // In SWAT, the calculation of LS factor needs `slsubbsn` (average slope length for subbasin)
            //   I found the calcuation of `slsubbsn` in QSWAT (function `getSlsubbsn` in `hrus.py`)
            //def getSlsubbsn(meanSlope) :
            //    """Estimate the average slope length in metres from the mean slope."""
            //    if meanSlope < 0.01 : return 120
            //        elif meanSlope < 0.02 : return 100
            //        elif meanSlope < 0.03 : return 90
            //        elif meanSlope < 0.05 : return 60
            //    else: return 30
            //
            // Currently, I decided to take slope length as input parameter.
            float sin_slp = sin(atan(m_slope[i]));
            // The calculation of LS factor follows the equation of McCool et al.(1989) used in RUSLE.
            // Also refers to Zhang et al.(2013), C&G, 52, 177-188.
            //                Liu et al.(2015), C&G, 78, 110-122.
            float beta = sin_slp / (3.f * pow(sin_slp, 0.8f) + 0.56f);
            float m = beta / (1.f + beta);
            float S = 0.f;
            if (m_slope[i] < 0.05f) S = 10.8f * sin_slp + 0.03f;
            else if (m_slope[i] >= 0.05f && m_slope[i] <= 0.14f) S = 16.8f * sin_slp - 0.5f;
            else S = 21.91f * sin_slp - 0.96f;
            // float xm = 0.6f * (1.f - exp(-35.835f * m_slope[i])); // eq. of SWAT
            // float s = 65.41f * sin_slp * sin_slp + 4.56f * sin_slp + 0.065f; // eq. of SWAT
            // If m_slpLen is not provided, use the equation developed by Renard et al.(1997) and the extended
            //    variation by Desmet and Govers (1996).
            float L = 0.f;
            if (nullptr == m_slpLen) {
                float up_lambda = m_flowAccm[i] * m_cellWth;
                float slope_lambda = up_lambda + m_cellWth;
                L = pow(slope_lambda, m + 1.f) - pow(up_lambda, m + 1.f);
                L /= m_cellWth * pow(22.13f, m);
            } else {
                L = pow(m_slpLen[i] / 22.13f, m);
            }

            if (m_usleP[i] < 0.f) m_usleP[i] = 0.f;
            if (m_usleP[i] > 1.f) m_usleP[i] = 1.f;
            // line 111-113 of soil_phys.f of SWAT source.
            m_usleMult[i] = 11.8f * exp(-0.053f * m_soilRock[i][0]) * m_usleK[i][0] * m_usleP[i] * L * S;

            m_slopeForPq[i] = pow(m_slope[i] * 1000.f, 0.16f);
        }
    }
    if (FloatEqual(m_cellAreaKM, NODATA_VALUE)) {
        m_cellAreaKM = m_cellWth * m_cellWth * 0.000001f;
        m_cellAreaKM1 = 3.79f * pow(m_cellAreaKM, 0.7f);
        m_cellAreaKM2 = 0.903f * pow(m_cellAreaKM, 0.017f);
    }
    if (nullptr == m_usleC) {
        m_usleC = new(nothrow) float[m_nCells];
#pragma omp parallel for
        for (int i = 0; i < m_nCells; i++) {
            if (m_aveAnnUsleC[i] < 1.e-4 || FloatEqual(m_aveAnnUsleC[i], NODATA_VALUE)) {
                m_aveAnnUsleC[i] = 0.001; // line 289 of readplant.f of SWAT source
            }
            if (nullptr != m_rsdCovSoil && nullptr != m_landCover) {
                // Which means dynamic USLE_C will be updated, so, m_aveAnnUsleC store the natural log of
                //  the minimum value of the USLE_C for the land cover
                m_aveAnnUsleC[i] = log(m_aveAnnUsleC[i]); // line 290 of readplant.f of SWAT source
            } else {
                m_usleC[i] = m_aveAnnUsleC[i];
            }
        }
    }
}

int SERO_MUSLE::Execute() {
    CheckInputData();
    InitialOutputs();
#pragma omp parallel for
    for (int i = 0; i < m_nCells; i++) {
        if (m_surfRf[i] < 0.0001f || m_rchID[i] > 0) {
            m_eroSed[i] = 0.f;
            m_eroSand[i] = 0.f;
            m_eroSilt[i] = 0.f;
            m_eroClay[i] = 0.f;
            m_eroSmAgg[i] = 0.f;
            m_eroLgAgg[i] = 0.f;
            continue;
        }
        // Update C factor
        if (m_iCfac == 0) {
            // Original method as described in section 4:1.1.2 in SWAT Theory 2009
            if (nullptr != m_rsdCovSoil) {
                if (m_landCover[i] > 0) {
                    // ln(0.8) = -0.2231435513142097
                    m_usleC[i] = exp((-0.223144f - m_aveAnnUsleC[i]) *
                                     exp(-0.00115f * m_rsdCovSoil[i]) + m_aveAnnUsleC[i]);
                } else {
                    if (m_rsdCovSoil[i] > 1.e-4) {
                        m_usleC[i] = exp(-0.223144f * exp(-0.00115f * m_rsdCovSoil[i]));
                    } else {
                        m_usleC[i] = 0.8f;
                    }
                }
            }
        } else {
            // new calculation method from RUSLE with the minimum C factor value
            //! fraction of cover by residue
            float rsd_frcov = exp(-m_rsdCovCoef * m_rsdCovSoil[i]);
            //! fraction of cover by biomass as function of lai
            float grcov_fr = m_lai[i] / (m_lai[i] + exp(1.748f - 1.748f * m_lai[i]));
            //! fraction of cover by biomass - adjusted for canopy height
            float bio_frcov = 1.f - grcov_fr * exp(-0.01f * m_canHgt[i]);
            m_usleC[i] = Max(1.e-10f, rsd_frcov * bio_frcov);
        }
        if (m_usleC[i] < UTIL_ZERO) m_usleC[i] = UTIL_ZERO;
        if (m_usleC[i] > 1.f) m_usleC[i] = 1.f;
        // TODO, use pkq.f of SWAT to calculate peak runoff rate? LJ.
        // peak flow, 1. / 25.4 = 0.03937007874015748
        float q = m_cellAreaKM1 * m_slopeForPq[i] * pow(m_surfRf[i] * 0.03937007874015748f, m_cellAreaKM2);
        // sediment yield, unit: tons, eq. 4:1.1.1 in SWAT theory 2009.
        float sed_yld = m_usleMult[i] * m_usleC[i] * pow(m_surfRf[i] * m_cellAreaKM * 1000.0f * q, 0.56f);
        // the snow pack effect
        if (m_snowAccum[i] > 0.0001f) {
            sed_yld /= exp(3.f * m_snowAccum[i] * 0.03937007874015748f);
        }
        m_eroSed[i] = sed_yld * 1000.f; /// kg

        /// particle size distribution of sediment yield
        m_eroSand[i] = m_eroSed[i] * m_detSand[i];
        m_eroSilt[i] = m_eroSed[i] * m_detSilt[i];
        m_eroClay[i] = m_eroSed[i] * m_detClay[i];
        m_eroSmAgg[i] = m_eroSed[i] * m_detSmAgg[i];
        m_eroLgAgg[i] = m_eroSed[i] * m_detLgAgg[i];
    }
    return 0;
}

bool SERO_MUSLE::CheckInputSize(const char* key, const int n) {
    if (n <= 0) {
        throw ModelException(MID_SERO_MUSLE, "CheckInputSize",
                             "Input data for " + string(key) + " is invalid. The size could not be less than zero.");
    }
    if (m_nCells != n) {
        if (m_nCells <= 0) {
            m_nCells = n;
        } else {
            throw ModelException(MID_SERO_MUSLE, "CheckInputSize", "Input data for " + string(key) +
                                 " is invalid. All the input data should have same size.");
        }
    }
    return true;
}

void SERO_MUSLE::SetValue(const char* key, const float value) {
    string sk(key);
    if (StringMatch(sk, Tag_CellWidth)) {
        m_cellWth = value;
    } else if (StringMatch(sk, VAR_DEPRATIO)) {
        m_depRatio = value;
    } else if (StringMatch(sk, VAR_RSDCOV_COEF)) {
        m_rsdCovCoef = value;
    } else if (StringMatch(sk, VAR_ICFAC)) {
        m_iCfac = CVT_INT(value);
    } else {
        throw ModelException(MID_SERO_MUSLE, "SetValue", "Parameter " + sk + " does not exist in current module.");
    }
}

void SERO_MUSLE::Set1DData(const char* key, const int n, float* data) {
    CheckInputSize(key, n);
    string s(key);
    if (StringMatch(s, VAR_USLE_C)) m_aveAnnUsleC = data;
    else if (StringMatch(s, VAR_LANDCOVER)) m_landCover = data;
    else if (StringMatch(s, VAR_SOL_COV)) m_rsdCovSoil = data;
    else if (StringMatch(s, VAR_CHT)) m_canHgt = data;
    else if (StringMatch(s, VAR_LAIDAY)) m_lai = data;
    else if (StringMatch(s, VAR_USLE_P)) m_usleP = data;
    else if (StringMatch(s, VAR_ACC)) m_flowAccm = data;
    else if (StringMatch(s, VAR_SLOPE)) m_slope = data;
    else if (StringMatch(s, VAR_SLPLEN)) m_slpLen = data;
    else if (StringMatch(s, VAR_SURU)) m_surfRf = data;
    else if (StringMatch(s, VAR_SNAC)) m_snowAccum = data;
    else if (StringMatch(s, VAR_STREAM_LINK)) m_rchID = data;
    else if (StringMatch(s, VAR_DETACH_SAND)) m_detSand = data;
    else if (StringMatch(s, VAR_DETACH_SILT)) m_detSilt = data;
    else if (StringMatch(s, VAR_DETACH_CLAY)) m_detClay = data;
    else if (StringMatch(s, VAR_DETACH_SAG)) m_detSmAgg = data;
    else if (StringMatch(s, VAR_DETACH_LAG)) m_detLgAgg = data;
    else {
        throw ModelException(MID_SERO_MUSLE, "Set1DData", "Parameter " + s + " does not exist.");
    }
}

void SERO_MUSLE::Set2DData(const char* key, int nRows, int nCols, float** data) {
    CheckInputSize(key, nRows);
    string s(key);
    m_nSoilLayers = nCols;
    if (StringMatch(s, VAR_USLE_K)) m_usleK = data;
    else if (StringMatch(s, VAR_ROCK)) m_soilRock = data;
    else {
        throw ModelException(MID_SERO_MUSLE, "Set2DData", "Parameter " + s +
                             " does not exist in current module. Please contact the module developer.");
    }
}

void SERO_MUSLE::Get1DData(const char* key, int* n, float** data) {
    InitialOutputs();
    string sk(key);
    if (StringMatch(sk, VAR_SOER)) *data = m_eroSed;
    else if (StringMatch(sk, VAR_SANDYLD)) *data = m_eroSand;
    else if (StringMatch(sk, VAR_SILTYLD)) *data = m_eroSilt;
    else if (StringMatch(sk, VAR_CLAYYLD)) *data = m_eroClay;
    else if (StringMatch(sk, VAR_SAGYLD)) *data = m_eroSmAgg;
    else if (StringMatch(sk, VAR_LAGYLD)) *data = m_eroLgAgg;
    else {
        throw ModelException(MID_SERO_MUSLE, "Get1DData", "Result " + sk + " does not exist.");
    }
    *n = m_nCells;
}