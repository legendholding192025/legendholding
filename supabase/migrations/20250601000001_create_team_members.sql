-- Team members for the Leadership Team page.
-- Super admin manages via /admin/team-members.
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT 'Legend Holding Group',
  image TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'board' CHECK (category IN ('board', 'ksa', 'china')),
  sort_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_team_members_category ON team_members(category);
CREATE INDEX IF NOT EXISTS idx_team_members_sort ON team_members(sort_order);
CREATE INDEX IF NOT EXISTS idx_team_members_visible ON team_members(is_visible);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible team members"
  ON team_members FOR SELECT
  USING (is_visible = true);

CREATE POLICY "Admins can manage team members"
  ON team_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('super_admin', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('super_admin', 'admin')
    )
  );

-- Seed with existing team data
INSERT INTO team_members (name, role, company, image, category, sort_order) VALUES
  ('Kai Zheng', 'Founder & Chairman', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054607/image_5_xtngrn.jpg', 'board', 1),
  ('Mira Wu', 'Co-Founder & Vice Chairman', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1767593928/10_copy_2122_mssssq.png', 'board', 2),
  ('Jonathan Stretton', 'Chief Operating Officer', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1767682094/Jonathan_r7nqeh.png', 'board', 3),
  ('Cannon Wang', 'VP Dealership & Strategy of LHG', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054569/8_copy_wxobcr.jpg', 'board', 4),
  ('Rejeesh Raveendran', 'Group Finance Director', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1764740125/5_copy_lgomsk.png', 'board', 5),
  ('Nagaraj Ponnada', 'General Manager', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054540/image_8_swwqoy.jpg', 'board', 6),
  ('Sonam Lama', 'Group HR Director', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1764143856/sonam_2_hpe4ou.png', 'board', 7),
  ('Waseem Khalayleh', 'Head of Brand', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1763818241/WhatsApp_Image_2025-06-20_at_12.082222_asqhsk.png', 'board', 8),
  ('Jade Li', 'Managing Director', 'Zul Energy', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1763817365/WhatsApp_Image_2025-06-20_at_12.08_1_ch0zex.png', 'board', 9),
  ('George Hua', 'Head of Commercial Vehicles', 'Legend Commercial Vehicles', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054559/3_copy_mxnwc7.jpg', 'board', 10),
  ('Tamer Khalil', 'Head of After Sales', 'Legend Auto Services', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1761054567/4_copy_upgmzf.jpg', 'board', 11),
  ('Sun Bo', 'Business Development Manager', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1766139126/02_3_whojcm.png', 'board', 12),
  ('Pawan Rathi', 'General Manager', 'Legend Rent a Car', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1763818661/656_ynivxt.png', 'board', 13),
  ('Mohamed Baz', 'Head of Motorcycles', 'Legend Motorcycles', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1765196419/Mohammed_Baz_z7qv1o.png', 'board', 14),
  ('Shameel Wohadally', 'Head of Internal Audit', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1767940725/Shameel_1_ylaowu.png', 'board', 15),
  ('Adrees Khan', 'Corporate Tax Manager', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1767787617/Adrees_nz1qnp.png', 'board', 16),
  ('Xiaolong Ma', 'Branch Manager', 'Legend Holding Group - KSA', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1765351058/5_copy55_ccgw0y.png', 'ksa', 1),
  ('Turki Altalhi', 'HR & Admin Manager', 'Legend Holding Group - KSA', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1766219042/turki_KSA_aupdzs.png', 'ksa', 2),
  ('Junfu Gao', 'General Manager of China Branch', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1764161813/4_copy_ukrn7s.png', 'china', 1),
  ('Xiaoya Zhao', 'Deputy General Manager of China Branch', 'Legend Holding Group', 'https://res.cloudinary.com/dzfhqvxnf/image/upload/v1764144502/4_copy2_exbafg.png', 'china', 2)
ON CONFLICT DO NOTHING;
