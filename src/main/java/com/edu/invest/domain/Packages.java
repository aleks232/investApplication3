package com.edu.invest.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Packages.
 */
@Entity
@Table(name = "packages")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Packages implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "packageDocument")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Documents> documents = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "packages", allowSetters = true)
    private Lots lot;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Packages title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Packages description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Documents> getDocuments() {
        return documents;
    }

    public Packages documents(Set<Documents> documents) {
        this.documents = documents;
        return this;
    }

    public Packages addDocuments(Documents documents) {
        this.documents.add(documents);
        documents.setPackageDocument(this);
        return this;
    }

    public Packages removeDocuments(Documents documents) {
        this.documents.remove(documents);
        documents.setPackageDocument(null);
        return this;
    }

    public void setDocuments(Set<Documents> documents) {
        this.documents = documents;
    }

    public Lots getLot() {
        return lot;
    }

    public Packages lot(Lots lots) {
        this.lot = lots;
        return this;
    }

    public void setLot(Lots lots) {
        this.lot = lots;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Packages)) {
            return false;
        }
        return id != null && id.equals(((Packages) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Packages{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
