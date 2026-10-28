'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function SmartClassroomDocs() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="docs-section" aria-labelledby="docs-heading">
      <motion.div
        className="docs-container"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.6, ease: 'easeOut' }
        }
      >
        <h2 id="docs-heading" className="docs-h1">
          Smart Classroom Automation System
        </h2>

        <p className="docs-p">
          The Smart Classroom Automation System is an IoT-enabled embedded
          automation platform designed to make classrooms more{' '}
          <strong>intelligent, secure, energy-efficient, and remotely manageable</strong>.
        </p>

        <p className="docs-p">
          The system uses a <strong>dual-controller architecture</strong>: the{' '}
          <strong>STM32F446RE</strong> manages real-time sensing, decision-making,
          authentication, safety, and physical actuators, while the{' '}
          <strong>ESP32-S3</strong> provides Wi-Fi connectivity, IoT communication,
          dashboards, cloud/database interaction, notifications, and remote control.
        </p>

        <h3 className="docs-h2">Hardware and Sensors</h3>

        <p className="docs-p">
          The major hardware includes{' '}
          <strong>
            STM32F446RE, ESP32-S3 N16R8, PN532 NFC/RFID reader, DHT11
            temperature/humidity sensor, LDR light sensor, MQ-2 smoke/gas sensor,
            relays, servo motors, buzzer, and OLED display
          </strong>
          .
        </p>

        <p className="docs-p">
          The PN532 provides RFID-based identification for{' '}
          <strong>attendance and authenticated door access</strong>, with the STM32
          controlling the corresponding servo. DHT11 enables environmental monitoring
          and automatic fan control, while the LDR supports{' '}
          <strong>automatic lighting and window operation</strong>. MQ-2 provides
          smoke/combustible-gas indication and triggers an immediate buzzer safety
          response.
        </p>

        <p className="docs-p">
          Relays are used to control electrical loads, while servo motors provide
          the mechanical opening and closing mechanism for the door and windows. The
          OLED provides local classroom information and notice display.
        </p>

        <h3 className="docs-h2">Automation and Mechanisms</h3>

        <p className="docs-p">
          The system automates{' '}
          <strong>
            lighting, ventilation, windows, door access, attendance, safety
            monitoring, and classroom information display
          </strong>
          .
        </p>

        <p className="docs-p">
          Local automation remains functional through the STM32 even if network
          connectivity is unavailable. Relays control electrical loads, while servo
          motors provide mechanical opening and closing of doors and windows. The
          OLED acts as a local notice/information display, receiving updated
          information through the ESP32-S3–STM32 interface.
        </p>

        <p className="docs-flow">
          <strong>Sensors → STM32F446RE → Actuators</strong>
        </p>
        <p className="docs-flow">
          <strong>STM32F446RE ↔ ESP32-S3 → IoT / Dashboard</strong>
        </p>

        <h3 className="docs-h2">IoT Applications</h3>

        <p className="docs-p">
          The ESP32-S3 connects the classroom to a{' '}
          <strong>web/app dashboard and cloud services</strong>, enabling remote
          monitoring and control.
        </p>

        <p className="docs-p">
          Users can view environmental conditions, attendance events, door/window
          status, lighting, fan operation, and safety status.
        </p>

        <p className="docs-p">
          The system can also provide notifications and process classroom
          information requests such as <code className="docs-code">/classdetails</code>,
          combining live STM32 data with cloud-stored information such as notices,
          timetable information, and attendance history.
        </p>

        <h3 className="docs-h2">Key Features</h3>

        <ul className="docs-list">
          <li>RFID-based attendance and authenticated access</li>
          <li>Automatic and remote lighting control</li>
          <li>Temperature/humidity-based fan automation</li>
          <li>LDR-based environmental automation</li>
          <li>Servo-operated smart doors and windows</li>
          <li>MQ-2-based smoke/gas warning with buzzer</li>
          <li>OLED classroom notice display</li>
          <li>Web/app-based IoT monitoring and control</li>
          <li>Remote notifications and classroom information services</li>
          <li>Local operation even during Wi-Fi failure</li>
        </ul>

        <h3 className="docs-h2">Future Enhancements</h3>

        <p className="docs-p">
          Future development can include{' '}
          <strong>
            AI-based occupancy detection, predictive energy management, advanced
            environmental sensors, mobile applications, biometric authentication,
            camera-assisted monitoring, analytics, automated scheduling, cloud data
            visualization, and machine-learning-based classroom optimization
          </strong>
          .
        </p>

        <p className="docs-p">
          The architecture can also be expanded with additional classrooms and
          centralized institutional monitoring.
        </p>

        <p className="docs-p docs-summary">
          <strong>
            In essence, the project combines embedded control, automation, IoT,
            security, environmental sensing, and mechanical actuation into one
            integrated smart-learning environment: STM32 controls the physical
            classroom, while ESP32-S3 connects it to the digital world.
          </strong>
        </p>
      </motion.div>
    </section>
  )
}

