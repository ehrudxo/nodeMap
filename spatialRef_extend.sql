INSERT INTO spatial_ref_sys(
            srid, auth_name, auth_srid, srtext, proj4text)
    VALUES (5180, 'EPSG', 5180, 'PROJCS["ITRF_2000_TM_Korea_West_Belt",
    GEOGCS["GCS_ITRF_2000",
        DATUM["D_ITRF_2000",
            SPHEROID["GRS_1980",6378137.0,298.257222101]],
        PRIMEM["Greenwich",0.0],
        UNIT["Degree",0.0174532925199433]],
    PROJECTION["Transverse_Mercator"],
    PARAMETER["False_Easting",200000.0],
    PARAMETER["False_Northing",500000.0],
    PARAMETER["Central_Meridian",125.0],
    PARAMETER["Scale_Factor",1.0],
    PARAMETER["Latitude_Of_Origin",38.0],
    UNIT["Meter",1.0]]', '+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs');
INSERT INTO spatial_ref_sys(
            srid, auth_name, auth_srid, srtext, proj4text)
    VALUES (5181, 'EPSG', 5181, 'PROJCS["ITRF_2000_TM_Korea_Central_Belt",
    GEOGCS["GCS_ITRF_2000",
        DATUM["D_ITRF_2000",
            SPHEROID["GRS_1980",6378137.0,298.257222101]],
        PRIMEM["Greenwich",0.0],
        UNIT["Degree",0.0174532925199433]],
    PROJECTION["Transverse_Mercator"],
    PARAMETER["False_Easting",200000.0],
    PARAMETER["False_Northing",500000.0],
    PARAMETER["Central_Meridian",125.0],
    PARAMETER["Scale_Factor",1.0],
    PARAMETER["Latitude_Of_Origin",38.0],
    UNIT["Meter",1.0]]', '+proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs');

INSERT INTO spatial_ref_sys(
            srid, auth_name, auth_srid, srtext, proj4text)
    VALUES (5186, 'EPSG', 5186, 'PROJCS["ITRF_2000_TM_Korea_Central_Belt",
    GEOGCS["GCS_ITRF_2000",
        DATUM["D_ITRF_2000",
            SPHEROID["GRS_1980",6378137.0,298.257222101]],
        PRIMEM["Greenwich",0.0],
        UNIT["Degree",0.0174532925199433]],
    PROJECTION["Transverse_Mercator"],
    PARAMETER["False_Easting",200000.0],
    PARAMETER["False_Northing",600000.0],
    PARAMETER["Central_Meridian",127.0],
    PARAMETER["Scale_Factor",1.0],
    PARAMETER["Latitude_Of_Origin",38.0],
    UNIT["Meter",1.0]]', '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs');
