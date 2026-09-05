CREATE TABLE IF NOT EXISTS `visitor_visits` (
    `vv_id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `vv_ip` varbinary(16) NOT NULL,
    `vv_visit_bucket` bigint unsigned NOT NULL,
    `vv_visited_at` datetime NOT NULL,
    `vv_expires_at` datetime NOT NULL,
    PRIMARY KEY (`vv_id`),
    UNIQUE KEY `visitor_ip_bucket_unique` (`vv_ip`, `vv_visit_bucket`),
    KEY `visitor_expires_at_idx` (`vv_expires_at`),
    KEY `visitor_visited_at_idx` (`vv_visited_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Read IP addresses in their normal IPv4/IPv6 form:
-- SELECT vv_id, INET6_NTOA(vv_ip) AS ip_address, vv_visited_at
-- FROM visitor_visits
-- ORDER BY vv_visited_at DESC;
