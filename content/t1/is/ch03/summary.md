## ⚡ ملخص IS Ch3: Data Warehouse & Processing

- **DW** = يسحب (**ETL**) ويدمج **دوريًا** من الـ sources لـ **dimensional أو normalized store** · **سنين history** · بيتحدث **batches** · للـ **BI**.
- **المكونات:** Source (**OLTP**) · Data profiler · **ETL** ← Staging ← **DDS** · **DQ database** · **Metadata** · Control system · Audit system · Front-end tools · **Cubes (MDB)**.
- **الحد الأدنى للـ DW:** **ETL + DDS**.
- **Cube:** خلايا بأبعاد · 3 أبعاد × 100 = **1,000,000** خلية · Sales / Cost / **Profit = Sales − Cost**.
- **Data cleansing:** بيانات غلط ← **Reject / Correct / Allow**.
- **ELT:** Load الأول وTransform جوه الـ DW · من غير ETL server · **MPP**.
- **مشاكل الدمج (5):** Availability · Time ranges · Definitions · Conversion · Matching.
- **Periodically:** نفس تكرار تحديث الـ source.
- **Schemas:** **Star** (بسيط، من غير sub-dimensions) · **Snowflake** (dimensions مطبّعة، تكرار أقل) · **Galaxy** (fact tables متعددة).
- **مثال:** 4 dimensions (date, spectator, location, game) + measures (count, charge).
